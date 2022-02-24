import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import { useCurrentUser } from 'main/utils/currentUser'

export default function EarthquakesIndexPage() {
  const currentUser = useCurrentUser();
  const { data: subjects, error: _error, status: _status } = useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/all"], { method: "GET", url: "/api/earthquakes/all" }, []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <EarthquakesTable subjects={subjects} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
} 






/*
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