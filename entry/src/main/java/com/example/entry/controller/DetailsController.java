package com.example.entry.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entry.model.Credential;
import com.example.entry.model.Details;
import com.example.entry.model.Response;
import com.example.entry.service.DetailsService;

@CrossOrigin
@RestController
@RequestMapping
public class DetailsController {
    
    private DetailsService detailsService;

    @Autowired
    public DetailsController(DetailsService detailsService) {
        this.detailsService = detailsService;
    }

    @GetMapping("/get")
    public List<Details> findAll(){
        return detailsService.findAll();
    }   
    
    @PostMapping("/save")
    public void save(@RequestBody Details details){
        detailsService.save(details);
    }

    @PostMapping("/check")
    public ResponseEntity<Response> check(@RequestBody Credential credential){
        List<Details> temp = detailsService.findAll();
        Response response = new Response();
        System.out.println(credential.toString());
        for(int i = 0 ; i<temp.size();i++){
            Details detail = temp.get(i);
            System.out.println(detail.toString());
            if(detail.getUserName().equals(credential.getUserName()) && detail.getPassword().equals(credential.getPassword())){
                System.out.println("sucess");
                response.setResponse("Logged in sucessfully");
                return new ResponseEntity<Response>(response,HttpStatus.OK);
            }
        }
        response.setResponse("Invalid username/Password");
        System.out.println("this is printing");
        return new ResponseEntity<Response>(response,HttpStatus.OK);
    }
}