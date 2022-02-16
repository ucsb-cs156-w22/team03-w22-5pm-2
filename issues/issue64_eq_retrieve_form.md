Implement Earthquake Form for Retrieve page.

Create a form component similar to the form for UCSBDatesForm except that this form is not for data entry of new records.  

Instead, it asks for:
* distance in km from Storke Tower
* minimum magnitude of an earthquake

Instead of a submit button, it has a "Retrieve" button.  It does not need to 
have the functionality for the `id` field (which is only used for edit), so 
remove that part of the form if you are using UCSBDatesForm as a model.


- [ ] The form has a `Retrieve` button and  `Cancel` button.
- [ ] The form is in the Storybook.
- [ ] The form has no direct connection to the backend; instead it accepts a callback function as a property that implements the onSubmit handler.  The backend connection is handled in the EarthquakeRetrievePage (a separate issue)
- [ ] test coverage is 100% for `npm run coverage`
- [ ] test coverage is 100% for `npx stryker run`

