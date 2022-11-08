package com.example.entry.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entry.model.Details;


public interface DetailsDao extends JpaRepository<Details,String>{
    
}
