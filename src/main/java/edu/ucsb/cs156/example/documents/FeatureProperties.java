package edu.ucsb.cs156.example.documents;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeatureProperties {
    
    private String mag;
    private String place;
    private String time;
    private String url;
    private String title;
}
