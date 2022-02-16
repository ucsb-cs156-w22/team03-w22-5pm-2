Add Earthquakes menu and page placeholders

The menu shows up only when logged in.  It has only one item for regular users (List) and two items for Admin users (List and Retrieve). These links go to placeholder pages EarthquakesIndexPage and EarthquakesRetrievePage

You can use the menu for Todos and the placeholder pages for Todos (already in the repo) as models.

# Navbar related Acceptance Criteria

- [ ] There is a menu item Earthquakes (this is done on the Navbar)
- [ ] The menu item on the navbar only shows up when you are logged in.
- [ ] It has two items for Admins, List and Create
- [ ] It has one item for regular Users, List
- [ ] List routes to  `/earthquakes/list`
- [ ] Create routes to  `/earthquakes/retrieve`

# Page related acceptance criteria

- [ ] There are pages components under `/frontend/src/main/pages/Earthquakes/` similar to those under `/frontend/src/main/pages/Todos/` for the create and index pages.
- [ ] There are entries for these pages in the storybook.
- [ ] The List placeholder page is available at `/earthquakes/list` (this is done in `App.js`)
- [ ] The Create placeholder page is available at `/earthquakes/retrieve` (this is done in `App.js`)

