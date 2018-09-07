package netgloo.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import netgloo.models.User;

@Transactional
public interface UserRepo extends CrudRepository<User, Integer>{

	User findByUsername(String username);
}
