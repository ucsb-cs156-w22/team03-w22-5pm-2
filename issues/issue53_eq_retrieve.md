Add endpoint to retrieve earthquakes

# ACs

- [ ] In Swagger, there is an api endpoint `POST /api/earthquakes/retrieve` accessible only to admins that takes parameters distanceKm and minMagnitude (similar to in Team01), makes a call to the EarthquakeQueryService, converts the JSON retreived to a `FeatureCollection` objects, and the stores each of the `Feature` objects in the list in the MongoDB collection `earthquakes`.


