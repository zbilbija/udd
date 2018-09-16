package netgloo.pojo;

import netgloo.elasticModels.EBook;

public class SearchResult {
	
	private EBook book;
	
	private String highlight;

	public SearchResult() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SearchResult(EBook book, String highlight) {
		super();
		this.book = book;
		this.highlight = highlight;
	}

	public EBook getBook() {
		return book;
	}

	public void setBook(EBook book) {
		this.book = book;
	}

	public String getHighlight() {
		return highlight;
	}

	public void setHighlight(String highlight) {
		this.highlight = highlight;
	}

}
