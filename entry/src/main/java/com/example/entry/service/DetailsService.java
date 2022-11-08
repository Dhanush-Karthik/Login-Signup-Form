package com.example.entry.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entry.dao.DetailsDao;
import com.example.entry.model.Details;

@Service
public class DetailsService {
    
    private DetailsDao detailsDao;

    @Autowired
    public DetailsService(DetailsDao detailsDao) {
        this.detailsDao = detailsDao;
    }
    
    public List<Details> findAll(){
        return detailsDao.findAll();
    }

    public void save(Details details){
        detailsDao.save(details);
    }
}
