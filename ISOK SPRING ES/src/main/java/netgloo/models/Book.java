package netgloo.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Book implements Serializable{

	@Id
	@GeneratedValue
	private int id;
	
	@Column(nullable = false)
	private String title;
	
	@Column
	private String author;

	@Column(nullable = false)
	private String keywords;
	
	@Column
	private int publicationYear;
	
	@Column(nullable = false)
	private String fileName;
	
	@Column
	private String mime;

	@ManyToOne()
	@JoinColumn(name="language")
	private Language language;
	
	@ManyToOne()
	@JoinColumn(name="category")
	private Category category;
	
	@ManyToOne()
	@JoinColumn(name="user")
	private User user;

	public Book(int id, String title, String author, String keywords, int publicationYear, String fileName, String mime,
			Language language, Category category, User user) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.keywords = keywords;
		this.publicationYear = publicationYear;
		this.fileName = fileName;
		this.mime = mime;
		this.language = language;
		this.category = category;
		this.user = user;
	}

	public Book() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public int getPublicationYear() {
		return publicationYear;
	}

	public void setPublicationYear(int publicationYear) {
		this.publicationYear = publicationYear;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getMime() {
		return mime;
	}

	public void setMime(String mime) {
		this.mime = mime;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
}
