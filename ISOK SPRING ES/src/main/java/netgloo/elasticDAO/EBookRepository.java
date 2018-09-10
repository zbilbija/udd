package netgloo.elasticDAO;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
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
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import netgloo.elasticModels.EBook;

@Repository
public class EBookRepository {
	
	private final String INDEX = "bookdata";
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
	
	public EBook getEBookById(String id){
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
        return fromMapToEBook(sourceAsMap);
    }
	
	public EBook updateEBookById(String id, EBook book){
        UpdateRequest updateRequest = new UpdateRequest(INDEX, TYPE, id)
                .fetchSource(true);    // Fetch Object after its update
        //Map<String, Object> error = new HashMap<>();
        //error.put("Error", "Unable to update book");
        try {
            String bookJson = objectMapper.writeValueAsString(book);
            updateRequest.doc(bookJson, XContentType.JSON);
            UpdateResponse updateResponse = restHighLevelClient.update(updateRequest);
            Map<String, Object> sourceAsMap = updateResponse.getGetResult().sourceAsMap();
            return fromMapToEBook(sourceAsMap);
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
    
    public List<EBook> fetchAllEBooks(){
    	SearchRequest searchRequest = new SearchRequest(); 
    	SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder(); 
    	searchSourceBuilder.query(QueryBuilders.matchAllQuery()); 
    	searchRequest.source(searchSourceBuilder);
    	List<EBook> result = new ArrayList<EBook>();
    	try {
			SearchResponse response = restHighLevelClient.search(searchRequest);
			for(SearchHit hit : response.getHits().getHits()) {
				Map<String, Object> source = hit.getSourceAsMap();
				result.add(fromMapToEBook(source));
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return result;
    }
    
    private EBook fromMapToEBook(Map<String, Object> map) {
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
    	return book;
    }
}
