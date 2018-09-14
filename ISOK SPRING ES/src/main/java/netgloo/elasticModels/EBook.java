package netgloo.elasticModels;


import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class EBook {

	@Id
	private String id;
	
	private String title;
	
	private String author;

	private String keywords;
	
	private int publicationYear;
	
	private String fileName;
	
	private String mime;
	
	private String text;
	
	private String category;
	
	private String language;
	
	public EBook() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EBook(String id, String title, String author, String keywords, int publicationYear, String fileName,
			String mime, String text, String category, String language) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.keywords = keywords;
		this.publicationYear = publicationYear;
		this.fileName = fileName;
		this.mime = mime;
		this.text = text;
		this.category = category;
		this.language = language;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}


	@Override
	public String toString() {
		return "EBook [id=" + id + ", title=" + title + ", author=" + author + ", keywords=" + keywords
				+ ", publicationYear=" + publicationYear + ", fileName=" + fileName + ", mime=" + mime + ", category="
				+ category + ", language=" + language + "]";
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
