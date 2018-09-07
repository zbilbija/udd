package netgloo.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import netgloo.models.Language;

@Transactional
public interface LanguageRepo extends CrudRepository<Language, Integer>{

}
