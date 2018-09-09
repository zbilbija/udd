package netgloo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import netgloo.dao.BookRepo;
import netgloo.elasticDAO.EBookRepository;
import netgloo.elasticModels.EBook;
import netgloo.models.Book;

@RestController()
@CrossOrigin( origins = "*")
@RequestMapping("/searchBooks")
public class BookController {

	@Autowired
	private BookRepo br;
	
	private EBookRepository ebr;

	public BookController(EBookRepository ebr) {
		super();
		this.ebr = ebr;
	}
	
	@RequestMapping(value="/add",  method = RequestMethod.POST)
	@ResponseBody
    public ResponseEntity<Object> insertBook(@RequestBody Book book) throws Exception{
		//update book model in your db with br (missing Category and Language)
		EBook bk = new EBook();
		EBook result = ebr.insertEBook(bk);
		return ResponseEntity.status(HttpStatus.OK).body(result);
    }
	
}
