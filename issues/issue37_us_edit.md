Edit for UCSBSubjects

Look at the edit logic in UCSBDateForm, UCSBDateIndexPage, and UCSBDateEditPage and model your edit logic accordingly.

- [ ] There is a page component for edit
- [ ] In `App.js` a route is set up to route to the edit page with a param for the id (e.g. `/UCSBSubjects/edit/:id`)
- [ ] There is a column on the index page that goes to the edit page, but only for admins
- [ ] When routing to the edit page, the form is pre-filled with the values for that record
- [ ] Changes to the data are validated with the same validation as data creation
- [ ] The id field cannot be changed
- [ ] Changes to the data take effect in the database when you click the submit button and you are rerouted to the List page, with the changes reflected.
- [ ] Clicking the cancel button reroutes to the list page, with the database unchanged.
- [ ] There is 100% test coverage from `npm run coverage`
- [ ] There is 100% test coverage from `npx stryker run`