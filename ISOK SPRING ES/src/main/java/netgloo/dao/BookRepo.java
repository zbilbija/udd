package netgloo.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import netgloo.models.Book;

@Transactional
@Repository
public interface BookRepo extends CrudRepository<Book, Integer>{

}
