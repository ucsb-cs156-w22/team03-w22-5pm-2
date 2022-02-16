Implement Earthquake Retrieve page.

Using the form component you made in another issue, implement
the page that retreives earthquakes.  

Add the form to the placeholder page you made, so that the form asks for:

* distance in km from Storke Tower
* minimum magnitude of an earthquake

Instead of a submit button, it has a "Retrieve" button.  It does not need to 
have the functionality for the `id` field (which is only used for edit), so 
remove that part of the form if you are using UCSBDatesForm as a model.


- [ ] Clicking `Retrieve` button causes a `POST` to the backend endpoint `/api/earthquakes/retrieve`; on success a toast message pops up saying `n Earthquakes retrieved` where `n` is the number of earthquakes, and you are redirected to the list page, where the new earthquakes can be seen.
- [ ] Clicking cancel returns you to the previous page with no changes made.
- [ ] test coverage is 100% for `npm run coverage`
- [ ] test coverage is 100% for `npx stryker run`

