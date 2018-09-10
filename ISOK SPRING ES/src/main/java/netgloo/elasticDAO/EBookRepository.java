package netgloo.elasticDAO;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
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
	
	public Map<String, Object> getEBookById(String id){
        GetRequest getRequest = new GetRequest(INDEX, TYPE, id);
        GetResponse getResponse = null;
        try {
            getResponse = restHighLevelClient.get(getRequest);
        } catch (java.io.IOException e){
            e.getLocalizedMessage();
        }
        Map<String, Object> sourceAsMap = getResponse.getSourceAsMap();
        return sourceAsMap;
    }
	
	public Map<String, Object> updateEBookById(String id, EBook book){
        UpdateRequest updateRequest = new UpdateRequest(INDEX, TYPE, id)
                .fetchSource(true);    // Fetch Object after its update
        Map<String, Object> error = new HashMap<>();
        error.put("Error", "Unable to update book");
        try {
            String bookJson = objectMapper.writeValueAsString(book);
            updateRequest.doc(bookJson, XContentType.JSON);
            UpdateResponse updateResponse = restHighLevelClient.update(updateRequest);
            Map<String, Object> sourceAsMap = updateResponse.getGetResult().sourceAsMap();
            System.out.println(sourceAsMap.values());
            return sourceAsMap;
        }catch (JsonProcessingException e){
            e.getMessage();
        } catch (java.io.IOException e){
            e.getLocalizedMessage();
        }
        return error;
    }

    public void deleteEBookById(String id) {
        DeleteRequest deleteRequest = new DeleteRequest(INDEX, TYPE, id);
        try {
            DeleteResponse deleteResponse = restHighLevelClient.delete(deleteRequest);
        } catch (java.io.IOException e){
            e.getLocalizedMessage();
        }
    }
}
