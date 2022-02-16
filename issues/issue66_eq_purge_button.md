Add Purge Button to Earthquakes List Page

On the List page for Earthquakes, add one `Purge`.

These buttons should call `POST` on the `/api/earthquakes/purge` endpoint,
which should delete all records in the earthquakes collection.

- [ ] Clicking `Purge` pops up a toast indicating that all records were successfully deleted, causes all records to be deleted, and stays on the List page, where the rows in the table should all disappear.
- [ ] Existing functionality of the List page is unaffected
- [ ] test coverage is 100% for `npm run coverage`
- [ ] test coverage is 100% for `npx stryker run`

