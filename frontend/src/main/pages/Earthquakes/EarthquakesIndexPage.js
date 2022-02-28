import React from 'react'
import { useBackend, useBackendMutation} from 'main/utils/useBackend';

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

    const deleteCallback = async (data) => {
        deleteMutation.mutate(data);
    };
    if(hasRole(currentUser, "ROLE_ADMIN")){
        return (
            <BasicLayout>
            <div className="pt-2">
                <h1>Earthquakes</h1>
                <EarthquakesTable subjects={subjects} currentUser={currentUser} />
                <Button variant = 'danger' onClick={deleteCallback}>Purge</Button>
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




