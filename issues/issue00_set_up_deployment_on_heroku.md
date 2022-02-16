Set up team deployments for prod and qa on Heroku, including Google OAuth setup

* Note that MongoDB set up is a separate issue, but is needed in order to finish this issue.
* We suggest coordinating with another team member that works on the MongoDB stuff while you work on this one.

# Acceptance Criteria:

- [ ] The main branch is deployed on Heroku at, for example,
      <https://w22-5pm-1-team03.herokuapp.com> (substituting your
      own team name for `w22-5pm-1`), and is set up for automatic
      deployment.  This is the so-called `prod` deployment.
- [ ] All members of the team are added to the Heroku `prod` deployment.
- [ ] The course instructor (`phtcon@ucsb.edu`) and the mentor listed
      at <https://ucsb-cs156.github.io/w22/info/teams/> is added to
      the heroku `prod` deployment. (Ask for the email they use with
      Heroku via slack.)
- [ ] There is also a deployment at, for example,
      <https://w22-5pm-1-team03-qa.herokuapp.com> (substituting your
      own team name for `w22-5pm-1`).  This deployment can be used
      by the team for `qa` of work in progress.  The team can use 
      it's slack channel to coordinate which branch is deployed there
      at any given time.
- [ ] The course instructor (`phtcon@ucsb.edu`) and the mentor listed
      at <https://ucsb-cs156.github.io/w22/info/teams/> is added to
      the heroku `qa` deployment. (Ask for the email they use with
      Heroku via slack.)
- [ ] Links to the `prod` and `qa` deployments are added near the top
      of the `README.md` of your `team03` repo.  (Do this via a PR; 
      don't just edit the main branch.)
- [ ] You have obtained the necessary info for the `.env` file for setting up the Heroku instances
      (detailed is the next several ACs) and you have distributed those values
      to members of your team securely.
      We recommend that you do NOT use the team channel in Slack, but instead do this
      via a group DM (that way, the message is private—not even the instructors can
      see private DMs on the course slack.)
- [ ] You have obtained values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the <https://console.developers.google.com/> following the instructions in the repo's `README.md` and the `/docs` directory for OAuth configuration and put these in the `.env` file. 
- [ ] You have gathered the UCSB email addresses of all team members and put them into the
      list of `ADMIN_EMAILS` in the `.env` file.      
- [ ] You have obtained the value of the `MONGODB_URI` from the team member responsible for the MongoDB setup.
- [ ] You have configured the values in your local `.env` file so that the application can run on `localhost`.
- [ ] You have 
      shared those values with other team members, and checked in to make sure they can run the app successfully on localhost also.
- [ ] You have configured the `.env` values as Config Variables on Heroku for both the prod and qa instances of the app,
      and have verified that the `main` branch of the starter code is up and running on both prod and qa.
