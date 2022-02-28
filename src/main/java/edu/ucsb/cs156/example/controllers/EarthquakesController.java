package edu.ucsb.cs156.example.controllers;


import java.util.List;
import java.util.ArrayList;


import edu.ucsb.cs156.example.collections.EarthquakesCollection;
import edu.ucsb.cs156.example.documents.Feature;
import edu.ucsb.cs156.example.documents.FeatureCollection;
import edu.ucsb.cs156.example.services.EarthquakeQueryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.Optional;

@Api(description = "Earthquake info from USGS")
@RequestMapping("/api/earthquakes")
@RestController
@Slf4j
public class EarthquakesController extends ApiController {
    public class EarthquakesCollectionOrError {
        Long id;
        EarthquakesCollection earthquakesCollection;
        ResponseEntity<String> error;

        public EarthquakesCollectionOrError(Long id) {
            this.id = id;
        }
    }

    @Autowired
    EarthquakesCollection earthquakesCollection;


    @Autowired
    ObjectMapper mapper;

    // list all
    @ApiOperation(value = "List all posts")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Feature> allEarthquakes() {
        Iterable<Feature> features = earthquakesCollection.findAll();
        return features;
    }
    // purge delete all
    @ApiOperation(value = "Deleta all posts")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/purge")
    public void purgeEarthquakes() throws JsonProcessingException{
        earthquakesCollection.deleteAll();
    }



    @Autowired
    EarthquakeQueryService earthquakeQueryService;
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ApiOperation(value = "Store query from USGS Earthquake API", notes = "")
    @PostMapping("/retrieve")
    public ResponseEntity<List<Feature>> getEarthquake(
            @ApiParam("distance in km, e.g. 100") @RequestParam String distance,
            @ApiParam("minimum magnitude, e.g. 2.5") @RequestParam String minMag
            ) throws JsonProcessingException {
        log.info("getEarthquakes: distance={} minMag={}", distance, minMag);
        
        String json = earthquakeQueryService.getJSON(distance, minMag);
        //json returned from Earthquakes API returns a FeatureCollection object
        FeatureCollection featureCollection = mapper.readValue(json, FeatureCollection.class);	
        
        //We want to save each Feature in the list of Features that is a property of FeatureCollections
        List<Feature> listFeatures = featureCollection.getFeatures();
        List<Feature> savedFeatures = new ArrayList<Feature>();
        for(Feature feat: listFeatures){
            Feature savedFeature = earthquakesCollection.save(feat);
            savedFeatures.add(savedFeature);
        }
        
        return ResponseEntity.ok().body(savedFeatures);
    }
}