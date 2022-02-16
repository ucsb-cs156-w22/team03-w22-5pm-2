Set up MongoDB database

* Note that the person working on Heroku QA/Prod and localhost `.env` values will need to
  coordinate with you to obtain the value of `MONGODB_URI`.
* We suggest coordinating with the team member doing the Heroku QA/Prod and localhost setup.

# Acceptance Criteria:

- [ ] You have set up an account for yourself at <https://cloud.mongodb.com>

      (We suggest that you
      and all team members standardizing on using your `@ucsb.edu` email for this purpose just to avoid confusion, and that you sign in to  <https://cloud.mongodb.com> using Google OAuth; but that's entirely a personal/team decision.)

- [ ] You have contacted a staff member to be added to the team and project for your team 
      (e.g. `w22-5pm-1`, `w22-5pm-2`, etc.)

- [ ] You have given all of the team members access to your project.
- [ ] You have created a database deployment following the instructions here: <https://ucsb-cs156.github.io/topics/mongodb_new_database/> 
- [ ] Under the deployment, you have a database called simply `database` 
- [ ] Under the database, you have collections called `reddit_posts` and `students`
      * See: <https://ucsb-cs156.github.io/topics/mongodb_new_database/> 
      * Also: <https://ucsb-cs156.github.io/topics/mongodb_spring_boot_basic_collection/>
- [ ] You have followed the instructions in the page below to obtain a `MONGODB_URI` for your 
      database deployment.  Note that should protect this credential, as it gives write access
      to your database!    Share it with the team member that is configuring the Heroku
      prod and qa instances, and sharing the `.env` values with the team (hopefully in private
      DMS, not the open team channel)
- [ ] In collaboration with the team member deploying on Heroku, you are successful in
      connecting to your MongoDB database from prod, qa, and localhost.
- [ ] Optionally, you may want to set up separate databases for prod, qa and dev, but this 
      is *not required* for this assignment.  
      We are mentioning it only so that:
      
      * you know it is a possibility.
      * you know that if this were a real app, it would be critical to separate these.








 values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the <https://console.developers.google.com/> following the instructions in the repo's `README.md` and the `/docs` directory for OAuth configuration and put these in the `.env` file. 
- [ ] You have gathered the UCSB email addresses of all team members and put them into the
      list of `ADMIN_EMAILS` in the `.env` file.      
- [ ] You have obtained the value of the `MONGODB_URI` from the team member responsible for the MongoDB setup.
- [ ] You have configured the values in your local `.env` file so that the application can run on `localhost`.
- [ ] You have 
      shared those values with other team members, and checked in to make sure they can run the app successfully on localhost also.
- [ ] You have configured the `.env` values as Config Variables on Heroku for both the prod and qa instances of the app,
      and have verified that the `main` branch of the starter code is up and running on both prod and qa.
