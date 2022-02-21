import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CollegiateSubredditsEditPage() {
  let { id } = useParams();

  const { data: csr, error: error, status: status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/collegiatesubreddits?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/collegiatesubreddits`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (csr) => ({
    url: "/api/collegiatesubreddits",
    method: "PUT",
    params: {
      id: csr.id,
    },
    data: {
      name: csr.name,
      location: csr.location,
      subreddit: csr.subreddit
    }
  });

  const onSuccess = (csr) => {
    toast(`CollegiateSubreddit Updated - id: ${csr.id} name: ${csr.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/collegiatesubreddits?id=${id}`]
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
        <h1>Edit CollegiateSubreddit</h1>
        {csr &&
          <CollegiateSubredditForm initialCollegiateSubreddit={csr} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}


