package netgloo.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import netgloo.models.Book;

@Transactional
public interface BookRepo extends CrudRepository<Book, Integer>{

}
