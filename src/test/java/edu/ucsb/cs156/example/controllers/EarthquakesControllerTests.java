package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.EarthquakeQueryService;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.collections.EarthquakesCollection;
import edu.ucsb.cs156.example.collections.StudentCollection;
import edu.ucsb.cs156.example.documents.Feature;
import edu.ucsb.cs156.example.documents.FeatureCollection;
import edu.ucsb.cs156.example.documents.FeatureProperties;
import edu.ucsb.cs156.example.documents.Metadata;
import edu.ucsb.cs156.example.documents.Student;
import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.TodoRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = EarthquakesController.class)
@Import(TestConfig.class)
public class EarthquakesControllerTests extends ControllerTestCase {

        @MockBean
        EarthquakesCollection earthquakesCollection;

        @MockBean
        EarthquakeQueryService earthquakeQueryService;

        @MockBean
        UserRepository userRepository;

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void api_earthquakes_all__user_logged_in__returns_a_earthquake_that_exists() throws Exception {

                // arrange
                FeatureProperties fp = FeatureProperties.builder()
                        .mag("mag")
                        .place("place")
                        .time("time")
                        .url("url")
                        .title("title")
                        .build();

                Feature feature = Feature.builder()
                        ._Id("1")
                        .type("type")
                        .properties(fp)
                        .id("id")
                        .build();

                
                List<Feature> lf = new ArrayList<>();
                lf.add(feature);


                when(earthquakesCollection.findAll()).thenReturn(lf);

                // act
                MvcResult response = mockMvc.perform(get("/api/earthquakes/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(earthquakesCollection, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(lf);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }


        @WithMockUser(roles = { "ADMIN" })
        @Test
        public void api_earthquakes_post__admin_logged_in__adds_one_earthquake_to_collection() throws Exception {

                // arrange

                FeatureProperties fp = FeatureProperties.builder()
                        .mag("mag")
                        .place("place")
                        .time("time")
                        .url("url")
                        .title("title")
                        .build();

                Feature feature = Feature.builder()
                        ._Id("1")
                        .type("type")
                        .properties(fp)
                        .id("id")
                        .build();
                
                List<Feature> fl = new ArrayList<Feature>();
                fl.add(feature);

                Metadata metadata = Metadata.builder()
                        .generated("gen")
                        .url("url")
                        .title("title")
                        .status("status")
                        .api("api")
                        .count(1)
                        .build();

                FeatureCollection fc = FeatureCollection.builder()
                        .type("type")
                        .metadata(metadata)
                        .features(fl)
                        .build();


                String fcAsJson = mapper.writeValueAsString(fc);

                String featureAsJson = mapper.writeValueAsString(feature);
                Feature savedFeature = mapper.readValue(featureAsJson, Feature.class);
                savedFeature.set_Id("efgh5678");
                List<Feature> saved_fl = new ArrayList<Feature>();
                saved_fl.add(savedFeature);
                String savedFeatureAsJson = mapper.writeValueAsString(saved_fl);


                String distance = "50";
                String minMag = "1";
                when(earthquakeQueryService.getJSON(eq(distance),eq(minMag))).thenReturn(fcAsJson);
                when(earthquakesCollection.save(eq(feature))).thenReturn(savedFeature);


                String url = String.format("/api/earthquakes/retrieve?distance=%s&minMag=%s",distance,minMag);
                // act
                MvcResult response = mockMvc.perform(
                                post(url)
                                .with(csrf()))
                                .andExpect(status().isOk())
                                .andReturn();

                // assert

                verify(earthquakeQueryService, times(1)).getJSON(eq(distance),eq(minMag));
                verify(earthquakesCollection, times(1)).save(eq(feature));
                String responseString = response.getResponse().getContentAsString();
                assertEquals(savedFeatureAsJson, responseString);
        }

}
