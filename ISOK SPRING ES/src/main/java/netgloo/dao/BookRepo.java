package netgloo.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import netgloo.models.Book;
import netgloo.models.Category;

@Transactional
@Repository
public interface BookRepo extends CrudRepository<Book, Integer>{

	List<Book> findByCategory(Category category);
}
