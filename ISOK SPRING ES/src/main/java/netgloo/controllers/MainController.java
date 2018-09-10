package netgloo.controllers;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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
import netgloo.models.Book;
import netgloo.models.Category;
import netgloo.models.Language;
import netgloo.models.User;

@RestController
@CrossOrigin( origins = "*")
@RequestMapping("/")
public class MainController {

	@Autowired
	private UserRepo ur;
	
	@Autowired
	private CategoryRepo cr;
	
	@Autowired
	private LanguageRepo lr;
	
	@Autowired
	private BookRepo br;
	
	@RequestMapping("/")
	@ResponseBody
	public String index() {
	
		Language lang = new Language("English");
		Language lang2 = new Language("Serbian");
		lr.save(lang);
		lr.save(lang2);
		
		Category cat = new Category("Thriller");
		Category cat2 = new Category("History");
		cr.save(cat);
		cr.save(cat2);
		
		User u = new User("Dusan", "Jeftic", "Dule", "pass", "admin", cat, null);
		User u2 = new User("Marko", "Jelaca", "Maki", "pass", "pretplatnik", cat2, null);
		ur.save(u);
		ur.save(u2);
		
		return "OK";
	}
	
	@RequestMapping(value="/login",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Object> login(@RequestBody User u, HttpSession session) {
		User foundUser = ur.findByUsername(u.getusername());
		if(foundUser==null){
			return ResponseEntity.status(HttpStatus.OK).body("{\"error\":\"Username not found\"}");
		}
		if(!foundUser.getUserPassword().equals(u.getUserPassword())){
			return ResponseEntity.status(HttpStatus.OK).body("{\"error\":\"Wrong password entered\"}");
		}
		session.setAttribute("user", foundUser.getusername());
		return ResponseEntity.status(HttpStatus.OK).body(foundUser);
	}
	
	@RequestMapping(value="/logout",  method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Object> logout(HttpSession session) {
		session.setAttribute("user", null);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	@RequestMapping(value="/user/{username}",  method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Object> getUser(@PathVariable String username, HttpSession session) {
		User foundUser = ur.findByUsername(username);
		return ResponseEntity.status(HttpStatus.OK).body(foundUser);
	}
	
	@RequestMapping(value="/updateProfile/{username}",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Object> updateProfile(@PathVariable String username, @RequestBody User u, HttpSession session) {
		User sessionUser = ur.findByUsername(username) ;
		if(!sessionUser.getusername().equals(u.getusername())){
			User foundUser = ur.findByUsername(u.getusername());
			if(foundUser!= null) {
				return ResponseEntity.status(HttpStatus.OK).body("{\"error\":\"Username not unique\"}");
			}
			sessionUser.setusername(u.getusername());
		}
		if(u.getUserPassword()!=null){
			sessionUser.setUserPassword(u.getUserPassword());
		}
		sessionUser.setFirstName(u.getFirstName());
		sessionUser.setLastName(u.getLastName());
		sessionUser.setType(u.getType());
		ur.save(sessionUser);
		session.setAttribute("user", sessionUser);
		return ResponseEntity.status(HttpStatus.OK).body(sessionUser);
	}
	
	@RequestMapping(value="/users",  method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Object> getUsers(HttpSession session) {
		List<User> foundUsers = (List<User>) ur.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(foundUsers);
	}
	
	//TODO: FETCH DATA
	
	@RequestMapping(value="/categories",  method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Object> getCategories(HttpSession session) {
		List<Category> foundCats = (List<Category>) cr.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(foundCats);
	}
	
	@RequestMapping(value="/languages",  method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Object> getLanguages(HttpSession session) {
		List<Language> foundLangs = (List<Language>) lr.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(foundLangs);
	}
	
	//TODO: BOOK DATA -> NOT ELASTIC RELATED
	@RequestMapping(value="/books",  method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Object> getBooks(HttpSession session) {
		List<Book> foundBooks = (List<Book>) br.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(foundBooks);
	}

}
