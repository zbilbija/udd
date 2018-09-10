package netgloo.controllers;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.pdf.PdfDate;
import com.itextpdf.text.pdf.PdfReader;

import netgloo.dao.BookRepo;
import netgloo.dao.CategoryRepo;
import netgloo.dao.LanguageRepo;
import netgloo.dao.UserRepo;
import netgloo.elasticDAO.EBookRepository;
import netgloo.elasticModels.EBook;
import netgloo.models.Book;
import netgloo.models.Category;
import netgloo.models.Language;
import netgloo.models.User;

@RestController()
@CrossOrigin( origins = "*")
@RequestMapping("/searchBooks")
public class ElasticController {

	@Autowired
	private BookRepo br;
	
	@Autowired
	private UserRepo ur;
	
	@Autowired
	private LanguageRepo lr;
	
	@Autowired
	private CategoryRepo cr;
	
	private EBookRepository ebr;

	public ElasticController(EBookRepository ebr) {
		super();
		this.ebr = ebr;
	}
			
	@RequestMapping(value = "/upload/{username}", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Object> uploadFiles(@PathVariable String username, @RequestBody MultipartFile[] files) {
		
		User us = ur.findByUsername(username);
	    Book book = null;
	    String filePath = System.getProperty("user.dir") + "/src/main/resources/assets";
	    
	    for (MultipartFile file : files) {
	        String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));

	        String newFileName = file.getOriginalFilename(); //set unique name when saving on server
	        File newFile;

	        File imageFolder = new File(filePath);
	        //check if parent folders exist else create it
	        if(imageFolder .exists() || imageFolder .mkdirs()) {
	        	int i = 1;
	            while ((newFile = new File(imageFolder .getAbsolutePath() + "\\" + newFileName)).exists()) {
	                newFileName = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf('.')) + "("+ i + ")"
	                		+ extension; //generate new name if file already exists
	                System.out.println(newFileName);
	                i++;
	            }
	            try {
	            	System.out.println("====================FILE PATH===============");
	            	System.out.println(newFile.getAbsolutePath());
	                file.transferTo(newFile);
	                book = resolveMetadata(newFile.getAbsolutePath());
	                book.setUser(us);
	                book = br.save(book);
	                addBookToElastic(book);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        } else {
	            System.out.println("Could not create folder at " + imageFolder.getAbsolutePath());
	        }
	    }
	    
	    return ResponseEntity.status(HttpStatus.OK).body(book);
	}
	
	@RequestMapping(value="/fetchAll",  method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Object> getAll(){
		List<EBook> list = ebr.fetchAllEBooks();
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	
	@RequestMapping(value="/add",  method = RequestMethod.POST)
	@ResponseBody
    public ResponseEntity<Object> insertBook(@RequestBody Book book) throws Exception{
		Book bookWithMeta = br.findOne(book.getId());
		Category c = cr.findOne(book.getCategory().getId());
		Language l = lr.findOne(book.getLanguage().getId());
		bookWithMeta.setCategory(c);
		bookWithMeta.setLanguage(l);
		bookWithMeta.setAuthor(book.getAuthor());
		bookWithMeta.setTitle(book.getTitle());
		bookWithMeta.setKeywords(book.getKeywords());
		bookWithMeta.setPublicationYear(book.getPublicationYear());
		bookWithMeta = br.save(bookWithMeta);
		EBook result = addBookToElastic(bookWithMeta);
		System.out.println("Added to elastic " + result.toString());
		return ResponseEntity.status(HttpStatus.OK).body(bookWithMeta);
    }
	
	private Book resolveMetadata(String filePath) {
		Book b = null;
		try {
			PdfReader reader = new PdfReader(filePath);
			HashMap<String, String> info = reader.getInfo();
			for (Map.Entry<String, String> entry : info.entrySet())
			{
			    System.out.println(entry.getKey() + "/" + entry.getValue());
			}
			b = new Book();
			b.setAuthor(resolveMetaAttr(info, "Author"));
			b.setTitle(resolveMetaAttr(info, "Title"));
			b.setMime("application/pdf");
			b.setKeywords(resolveMetaAttr(info, "Keywords"));
			b.setFileName(filePath);
			Calendar c = PdfDate.decode(info.get("CreationDate"));
			int year = c.get(Calendar.YEAR);
			b.setPublicationYear(year);
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return b;
	}
	
	private EBook addBookToElastic(Book book) {
		EBook bk = new EBook();
		bk.setId(Integer.toString(book.getId()));
		bk.setAuthor(book.getAuthor());
		bk.setTitle(book.getTitle());
		if(book.getCategory() != null)
			bk.setCategory(book.getCategory().getName());
		if(book.getLanguage() != null)
			bk.setLanguage(book.getLanguage().getName());
		bk.setFileName(book.getFileName());
		bk.setKeywords(book.getKeywords());
		bk.setMime(book.getMime());
		bk.setPublicationYear(book.getPublicationYear());
		return ebr.insertEBook(bk);
	}
	
	private String resolveMetaAttr(HashMap<String, String> info, String attr) {
		if(info.get(attr) != null)
			return info.get(attr);
		else
			return "";
	}
	
}
