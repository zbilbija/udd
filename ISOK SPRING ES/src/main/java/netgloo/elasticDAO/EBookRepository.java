package netgloo.elasticDAO;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import netgloo.elasticModels.EBook;
import netgloo.pojo.AdvancedSearchParams;
import netgloo.pojo.SearchResult;

@Repository
public class EBookRepository {
	
	private final String INDEX = "bookrepo";
    private final String TYPE = "books";

    private RestHighLevelClient restHighLevelClient;

    private ObjectMapper objectMapper;
    
	public EBookRepository(RestHighLevelClient restHighLevelClient, ObjectMapper objectMapper) {
		super();
		this.restHighLevelClient = restHighLevelClient;
		this.objectMapper = objectMapper;
	}


	public EBook insertEBook(EBook book){
		  //book.setId(UUID.randomUUID().toString());
		  Map dataMap = objectMapper.convertValue(book, Map.class);
		  IndexRequest indexRequest = new IndexRequest(INDEX, TYPE, book.getId())
		                .source(dataMap);
		  try {
		    IndexResponse response = restHighLevelClient.index(indexRequest);
		  } catch(ElasticsearchException e) {
		    e.getDetailedMessage();
		  } catch (java.io.IOException ex){
		    ex.getLocalizedMessage();
		  }
		  return book;
	}
	
	public SearchResult getEBookById(String id){
        GetRequest getRequest = new GetRequest(INDEX, TYPE, id);
        GetResponse getResponse = null;
        try {
            getResponse = restHighLevelClient.get(getRequest);
        } catch (java.io.IOException e){
            e.getLocalizedMessage();
        }
        Map<String, Object> sourceAsMap = getResponse.getSourceAsMap();
        for (Map.Entry<String, Object> entry : sourceAsMap.entrySet()) {
        	System.out.println(entry.getKey() + "/" + entry.getValue().toString());
        }
        return fromMapToResult(sourceAsMap);
    }
	
	public SearchResult updateEBookById(String id, EBook book){
        UpdateRequest updateRequest = new UpdateRequest(INDEX, TYPE, id)
                .fetchSource(true);    // Fetch Object after its update
        //Map<String, Object> error = new HashMap<>();
        //error.put("Error", "Unable to update book");
        try {
            String bookJson = objectMapper.writeValueAsString(book);
            updateRequest.doc(bookJson, XContentType.JSON);
            UpdateResponse updateResponse = restHighLevelClient.update(updateRequest);
            Map<String, Object> sourceAsMap = updateResponse.getGetResult().sourceAsMap();
            return fromMapToResult(sourceAsMap);
        }catch (JsonProcessingException e){
            e.getMessage();
        } catch (java.io.IOException e){
            e.getLocalizedMessage();
        }
        return null;
    }

    public void deleteEBookById(String id) {
        DeleteRequest deleteRequest = new DeleteRequest(INDEX, TYPE, id);
        try {
            DeleteResponse deleteResponse = restHighLevelClient.delete(deleteRequest);
        } catch (java.io.IOException e){
            e.getLocalizedMessage();
        }
    }
    
    public List<SearchResult> fetchAllEBooks(){
    	SearchRequest searchRequest = new SearchRequest(); 
    	SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder(); 
    	searchSourceBuilder.query(QueryBuilders.matchAllQuery()); 
    	searchRequest.source(searchSourceBuilder);
    	List<SearchResult> result = new ArrayList<SearchResult>();
    	try {
			SearchResponse response = restHighLevelClient.search(searchRequest);
			for(SearchHit hit : response.getHits().getHits()) {
				
				result.add(fromMapToResult(hit, ""));
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return result;
    }
    
    public List<SearchResult> termQuery(String field, String value){
    	SearchRequest searchRequest = new SearchRequest(); 
    	SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
    	QueryBuilder matchQueryBuilder = QueryBuilders.termQuery(field, value);
    	searchSourceBuilder.query(matchQueryBuilder);
    	if(field.equals("text")) {
	    	HighlightBuilder highlightBuilder = new HighlightBuilder();
	    	HighlightBuilder.Field highlightUser = new HighlightBuilder.Field(field);
	    	highlightBuilder.field(highlightUser);
	    	searchSourceBuilder.highlighter(highlightBuilder);
    	}
    	searchRequest.source(searchSourceBuilder);
    	List<SearchResult> result = new ArrayList<SearchResult>();
    	try {
			SearchResponse response = restHighLevelClient.search(searchRequest);
			System.out.println(response.getHits().totalHits);
			for(SearchHit hit : response.getHits().getHits()) {
				result.add(fromMapToResult(hit, field));
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return result;
    }
    
    public List<SearchResult> phraseQuery(String field, String value){
    	SearchRequest searchRequest = new SearchRequest(); 
    	SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
    	QueryBuilder matchQueryBuilder = QueryBuilders.matchPhraseQuery(field, value);
    	searchSourceBuilder.query(matchQueryBuilder);
    	if(field.equals("text")) {
	    	HighlightBuilder highlightBuilder = new HighlightBuilder();
	    	HighlightBuilder.Field highlightUser = new HighlightBuilder.Field(field);
	    	highlightBuilder.field(highlightUser);
	    	searchSourceBuilder.highlighter(highlightBuilder);
    	}
    	searchRequest.source(searchSourceBuilder);
    	List<SearchResult> result = new ArrayList<SearchResult>();
    	try {
			SearchResponse response = restHighLevelClient.search(searchRequest);
			System.out.println(response.getHits().totalHits);
			for(SearchHit hit : response.getHits().getHits()) {
				result.add(fromMapToResult(hit, field));
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return result;
    }
    
    public List<SearchResult> fuzzyQuery(String field, String value){
    	SearchRequest searchRequest = new SearchRequest(); 
    	SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
    	QueryBuilder fuzzyQueryBuilder = QueryBuilders.fuzzyQuery(field, value).fuzziness(Fuzziness.TWO);
    	searchSourceBuilder.query(fuzzyQueryBuilder);
    	if(field.equals("text")) {
	    	HighlightBuilder highlightBuilder = new HighlightBuilder();
	    	HighlightBuilder.Field highlightUser = new HighlightBuilder.Field(field);
	    	highlightBuilder.field(highlightUser);
	    	searchSourceBuilder.highlighter(highlightBuilder);
    	}
    	searchRequest.source(searchSourceBuilder);
    	List<SearchResult> result = new ArrayList<SearchResult>();
    	try {
			SearchResponse response = restHighLevelClient.search(searchRequest);
			System.out.println(response.getHits().totalHits);
			for(SearchHit hit : response.getHits().getHits()) {
				result.add(fromMapToResult(hit, field));
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return result;
    }
    
    public List<SearchResult> booleanQuery(AdvancedSearchParams params, String type){
    	String field = "";
    	SearchRequest searchRequest = new SearchRequest(); 
    	SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
    	QueryBuilder matchQueryBuilder1 = QueryBuilders.matchPhraseQuery(params.getField1(), params.getValue1());
    	QueryBuilder matchQueryBuilder2 = QueryBuilders.matchPhraseQuery(params.getField2(), params.getValue2());
    	QueryBuilder boolQueryBuilder = null;
    	switch(type) {
	    	case "AND":
	    		boolQueryBuilder = QueryBuilders.boolQuery().must(matchQueryBuilder1).must(matchQueryBuilder2);
	    		break;
	    	case "OR":
	    		boolQueryBuilder = QueryBuilders.boolQuery().should(matchQueryBuilder1).should(matchQueryBuilder2);
	    		break;
	    	case "NOT":
	    		boolQueryBuilder = QueryBuilders.boolQuery().must(matchQueryBuilder1).mustNot(matchQueryBuilder2);
	    		break;
	    	default:
	    		boolQueryBuilder = QueryBuilders.boolQuery().must(matchQueryBuilder1).must(matchQueryBuilder2);
	    		break;
    	}
    	searchSourceBuilder.query(boolQueryBuilder);
    	if(params.getField1().equals("text") || params.getField2().equals("text")) {
	    	HighlightBuilder highlightBuilder = new HighlightBuilder();
	    	HighlightBuilder.Field highlightUser = new HighlightBuilder.Field("text");
	    	field = "text";
	    	highlightBuilder.field(highlightUser);
	    	searchSourceBuilder.highlighter(highlightBuilder);
    	}
    	searchRequest.source(searchSourceBuilder);
    	List<SearchResult> result = new ArrayList<SearchResult>();
    	try {
			SearchResponse response = restHighLevelClient.search(searchRequest);
			System.out.println(response.getHits().totalHits);
			for(SearchHit hit : response.getHits().getHits()) {
				result.add(fromMapToResult(hit, field));
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return result;
    }
    
    private SearchResult fromMapToResult(SearchHit hit, String field) {
    	Map<String, Object> map = hit.getSourceAsMap();
    	SearchResult retVal = new SearchResult();
    	EBook book = new EBook();
    	book.setFileName((String)map.get("fileName"));
    	book.setKeywords((String)map.get("keywords"));
    	book.setAuthor((String)map.get("author"));
    	book.setMime((String)map.get("mime"));
    	book.setPublicationYear((Integer)map.get("publicationYear"));
    	book.setLanguage((String)map.get("language"));
    	book.setId((String)map.get("id"));
    	book.setTitle((String)map.get("title"));
    	book.setCategory((String)map.get("category"));
    	retVal.setBook(book);
    	if(field.equals("text")) {
    		String high = "";
    		Map<String, HighlightField> highlightFields = hit.getHighlightFields();
    	    HighlightField highlight = highlightFields.get("text");
    	    for(Text t : highlight.fragments()) {
    	    	high += t.string();
    	    }
    	    high = high.replaceAll("\\<.*?\\>", "");
    	    retVal.setHighlight(high);
    	}
    	return retVal;
    }
    
    private SearchResult fromMapToResult(Map<String, Object> map) {
    	SearchResult retVal = new SearchResult();
    	EBook book = new EBook();
    	book.setFileName((String)map.get("fileName"));
    	book.setKeywords((String)map.get("keywords"));
    	book.setAuthor((String)map.get("author"));
    	book.setMime((String)map.get("mime"));
    	book.setPublicationYear((Integer)map.get("publicationYear"));
    	book.setLanguage((String)map.get("language"));
    	book.setId((String)map.get("id"));
    	book.setTitle((String)map.get("title"));
    	book.setCategory((String)map.get("category"));
    	retVal.setBook(book);
    	return retVal;
    }
}
