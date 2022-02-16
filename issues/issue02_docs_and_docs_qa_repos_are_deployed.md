Set up -docs and -docs-qa websites to host Storybook.

## General Acceptance criteria

- [ ] A personal access token with scope `repo` has been added
      under `Secrets`->`Actions` with key `DOCS_TOKEN`.   This goes in the main repo for 
      team03, NOT in the `-docs` or `-docs-qa` repos. 

## Acceptance Criteria for `team03-yourTeam-docs-qa` 

- [ ] GitHub Actions is turned on in your main `team03-yourTeam` repo.
- [ ] A public repo with the name `team03-yourTeam-docs-qa` exists (create this by hand, or you can try manually triggering the GitHub Action in the `team03-yourTeam` repo called `00 Publish 00 docs create repos`. If you already set up the `DOCS_TOKEN` this may do it automatically for you.
- [ ] There is a `README.md` file and a `docs/.keep` file on the `main` 
      branch of the `team03-yourTeam-docs-qa` repo.  Create these by hand to establish
      the main branch before you run the job for the first time. (If the script worked at the previous step, you will NOT have to do this :-) )
- [ ] GitHub pages is enabled on the `team03-yourTeam-docs-qa` repo (you probably have to do this by hand) for the `main` branch and `/docs` folder,
      in the `Settings` menu of the `-docs-qa` repo.
- [ ] GitHub pages shows a link to the Storybook for the main branch at 
      <https://ucsb-cs156-w22.github.io/team03-yourTeam-docs-qa>.  To get this to happen:
      1. Go under the `Actions` for the main repo
      2. Look to the list of Actions at left for for `Publish 01 docs`
      3. Look to the right for a `Run Workflow` button.
      4. Click and run the workflow from the `main` branch.
      5. Wait for the workflow to finish
      6. Wait for GitHub pages to refresh.

## Acceptance Criteria for `team03-yourTeam-docs-qa` 

- [ ] A public repo with the name `team03-yourTeam-docs` exists (create this by hand, unless the script worked at the previous step.)
- [ ] There is a `README.md` file and a `docs/.keep` file on the `main` 
      branch of the `team03-yourTeam-docs` repo.  Create these by hand to establish
      the main branch before you run the job for the first time. (Unless the
      script worked at the previous step.)
- [ ] GitHub pages is enabled on the `team03-yourTeam-docs` repo (you probably have to do this by hand) for the `main` branch and `/docs` folder.
      in the `Settings` menu of the `-docs` repo.
- [ ] GitHub pages shows a link to the Storybook for the main branch at 
      <https://ucsb-cs156-w22.github.io/team03-yourTeam-docs>.  To get this to happen:
      1. Go under the `Actions` for the main repo
      2. Look to the list of Actions at left for for `Publish 02 docs`
      3. Look to the right for a `Run Workflow` button.
      4. Click and run the workflow from the `main` branch.
      5. Wait for the workflow to finish
      6. Wait for GitHub pages to refresh.


## Acceptance Criteria for README in your main repo

- [ ] The README.md has a correct link to the documentation for the QA site.

## Details

Make a branch `xy-fix-README-doc-links` and on this branch, edit the `README.md` to make the links near the top to the GitHub pages sites for documentation point to the correct spot (e.g. edit this:

```md
Storybook is here:
* Production: <https://ucsb-cs156-w22.github.io/starter-team03-docs/>
* QA:  <https://ucsb-cs156-w22.github.io/starter-team03-docs-qa/>
```

to say this (substituting your team in for `w22-7pm-3`)

```md
Storybook is here:
* Production: <https://ucsb-cs156-w22.github.io/team03-w22-7pm-3-docs/>
* QA:  <https://ucsb-cs156-w22.github.io/team03-w22-7pm-3docs-qa/>
```

Then, do a pull request to the main branch. 

