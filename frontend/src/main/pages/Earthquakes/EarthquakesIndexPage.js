import React from 'react'
import { useBackend, useBackendMutation} from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import { hasRole, useCurrentUser } from 'main/utils/currentUser'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EarthquakesIndexPage() {
  const currentUser = useCurrentUser();
  const { data: subjects, error: _error, status: _status } = useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/all"], { method: "GET", url: "/api/earthquakes/all" }, []
    );

    const objectToAxiosParams = () => ({
        url: '/api/earthquakes/purge',
        method: 'POST',
      });
    
    const deleteMutation = useBackendMutation(
        objectToAxiosParams,
        {
            onSuccess: () => toast('Earthquakes have been purged'),
        },
        // Stryker disable next-line all : hard to set up test for caching
        ['/api/earthquakes/all']
    );



   /* const objectToAxiosParams = (obj) => ({
      url: "/api/earthquakes/purge",
      method: "POST",

    });

    const onSuccess = (obj) => {
      toast(`Earthquakes Purged`);
    }

    const mutation = useBackendMutation(
      objectToAxiosParams,
       { onSuccess }, 
       // Stryker disable next-line all : hard to set up test for caching
       ["/api/earthquakes/purge"]
       );
  
       const { isSuccess } = mutation



       const onSubmit = async (data) => {
        mutation.mutate(data);
      }
      if (isSuccess) {
        return <Navigate to="/earthquakes/list" />
      }

    if(hasRole(currentUser, "ROLE_ADMIN")){
      return (
        <BasicLayout>
          <div className="pt-2">
            <h1>Earthquakes</h1>
          
            <EarthquakesForm submitAction={onSubmit} />

            <EarthquakesTable subjects={subjects} currentUser={currentUser} />
          </div>
        </BasicLayout>
      )
*/
    const deleteCallback = async (data) => {
        deleteMutation.mutate(data);
    };
    if(hasRole(currentUser, "ROLE_ADMIN")){
        return (
            <BasicLayout>
            <div className="pt-2">
                <h1>Earthquakes</h1>
                <EarthquakesTable subjects={subjects} currentUser={currentUser} />
                <Button 
                    variant = 'danger' 
                    onClick={deleteCallback}
                    data-testid="Earthquakes-Purge-Button"
                >
                    Purge
                </Button>
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


<form id="form" action="/api/earthquakes/purge" method="POST">
              <button name="purge" value="upvote">Purge</button>
            </form>




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
