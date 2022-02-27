import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import { hasRole, useCurrentUser } from 'main/utils/currentUser'
import { Button, Form } from 'react-bootstrap';

export default function EarthquakesIndexPage() {
  const currentUser = useCurrentUser();
  const { data: subjects, error: _error, status: _status } = useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/all"], { method: "GET", url: "/api/earthquakes/all" }, []
    );



    if(hasRole(currentUser, "ROLE_ADMIN")){
      return (
        <BasicLayout>
          <div className="pt-2">
            <h1>Earthquakes</h1>
            <form id="form" action="/api/earthquakes/purge" method="POST">
              <button name="purge" value="upvote">Purge</button>
            </form>

            <EarthquakesTable subjects={subjects} currentUser={currentUser} />
          </div>
        </BasicLayout>
      )
    }
    else{
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <EarthquakesTable subjects={subjects} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}
} 






/*
/api/earthquakes/purge



works but sends to the purge page
            <form id="form" action="/api/earthquakes/purge" method="POST">
              <button name="purge" value="upvote">Purge</button>
            </form>





<form action="" method="post">
    <button name="foo" value="upvote">Buttondisplayed</button>
</form>

<Button
                type="submit"
                data-testid="Purge-submit"
            >
                {"Purge"}
            </Button>



<Button
                //variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="Purge-cancel"
            >
                Purge
            </Button>


<form action="" method="post">
              <button name="Purge" value="purge">Purge</button>
            </form>




 <Button
                type="submit"
                data-testid="CollegiateSubredditForm-submit"
            >
                {buttonLabel}
            </Button>





<form action="" method="post">
    <button name="foo" value="upvote">Upvote</button>
</form>



<Button
                //variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="CollegiateSubredditForm-cancel"
            >
                Cancel
            </Button>






import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function EarthquakesIndexPage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <p>
          This is where the index page will go
        </p>
      </div>
    </BasicLayout>
  )
}
*/