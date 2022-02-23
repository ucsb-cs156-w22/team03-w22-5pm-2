const earthquakesFixtures = {
  
    oneEarthquake: [
        {
          "_Id": "6213ea946e8cd25c78e6fba5",
          "type": "Feature",
          "properties": {
            "mag": "3.86",
            "place": "10km NW of Santa Paula, CA",
            "time": "1644539102020",
            "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40182560",
            "title": "M 3.9 - 10km NW of Santa Paula, CA"
          },
          "id": "ci40182560"
        }
    ],
    twoEarthquake: [
      {
        "_Id": "111111111111111111111111",
        "type": "Feature",
        "properties": {
          "mag": "4.87",
          "place": "11km NW of Santa Paula, CA",
          "time": "2644539102020",
          "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40182560",
          "title": "M 3.9 - 11km NW of  tester1, CA"
        },
        "id": "ci40182777"
      }
  ] ,
  threeEarthquake: [
    {
      "_Id": "222222222222222222222222",
      "type": "Feature",
      "properties": {
        "mag": "4.86",
        "place": "10km NW of Santa Paula, CA",
        "time": "3644539102020",
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40182560",
        "title": "M 3.9 - 10km NW of  tester2, CA"
      },
      "id": "ci40182666"
    }
] 
};
      


export { earthquakesFixtures };