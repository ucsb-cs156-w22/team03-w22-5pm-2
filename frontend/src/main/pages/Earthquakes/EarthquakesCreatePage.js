import React from 'react';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useBackend } from 'main/utils/useBackend';

export default function EarthquakesCreatePage() {

  const objectToAxiosParams = (earthquake) => ({
    url: "/api/earthquakes/retrieve",
    method: "POST",
    params: {
      distance: earthquake.distance,
      minMag: earthquake.minMag
    }
  });

  const onSuccess = (earthquake) => {
    toast(`${earthquake.length} Earthquakes retrieved`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/earthquakes/retrieve"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/earthquakes/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Retrieve Earthquakes</h1>

        <EarthquakeForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  );
}