package netgloo.dao;

import javax.transaction.Transactional;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import netgloo.models.Category;
@Transactional
@Repository
public interface CategoryRepo extends CrudRepository<Category, Integer>{

}
