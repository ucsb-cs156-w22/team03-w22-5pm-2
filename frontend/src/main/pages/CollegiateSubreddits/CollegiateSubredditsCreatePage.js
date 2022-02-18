import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
//import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CollegiateSubredditsCreatePage() {

  const objectToAxiosParams = (csr) => ({
    url: "/api/collegiateSubreddits/post",
    method: "POST",
    params: {
      name: csr.name,
      location: csr.location,
      subreddit: csr.subreddit
    }
  });

  const onSuccess = (csr) => {
    toast(`New collegiateSubreddit Created - id: ${csr.id} name: ${scr.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/collegiatesubreddits/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/collegiatesubreddits/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New CollegiateSubreddit</h1>

        <UCSBDateForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}