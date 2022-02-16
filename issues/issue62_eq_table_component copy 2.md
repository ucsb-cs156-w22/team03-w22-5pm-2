Table component for Earthquakes

Using the `StudentsTable` component as a model, create a similar component for Earthquakes.

For the columns in the table, use the `id` field from MongoDb as well as these fields from the `Feature` class:

* `"title": "M 2.2 - 10km ESE of Ojai, CA"`
* `"mag": 2.16,`
* `"place": "10km ESE of Ojai, CA",`
* `"time": 1644571919000,` 

For an extra challenge, make the title be a link to the URL in the url field.

# ACs

- [ ] The table has columns for the fields above indicated
- [ ] There are fixtures under `/frontend/src/fixtures` for this data type, similar to the otherfixtures files.
- [ ] There is a storybook entry similar to the one for `UCSBDatesTable`
- [ ] 100% coverage with `npm run coverage`
- [ ] 100% coverage with `npx stryker run`

# Challenge ACs

- [ ] The title field is an HTML link to the url in the `url` field.
