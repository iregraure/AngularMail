package com.angularMail.model.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.angularMail.model.entities.Nacionalidad;


@Repository
public interface NacionalidadRepository extends CrudRepository<Nacionalidad, Integer> {

}
