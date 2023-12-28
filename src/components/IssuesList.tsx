import { useState } from "react";
import { useFetchIssues, useSearchQuery } from "../api/queries";
import { IssueItem } from "./IssueItem";

export default function IssuesList({
  labels,
  status,
}: {
  labels: string[];
  status: string;
}) {
  const [searchValue, setSearchValue] = useState("");
  const issuesQuery = useFetchIssues(labels, status);
  const searchQuery = useSearchQuery(searchValue);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const searchValue = formData.get("search") as string;
          setSearchValue(searchValue);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setSearchValue("");
            }
          }}
        />
      </form>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{(issuesQuery.error as Error).message}</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
        <ul className="issues-list">
          {issuesQuery.isSuccess &&
            issuesQuery.data?.map((issue) => (
              <IssueItem
                key={issue.id}
                title={issue.title}
                number={issue.number}
                assignee={issue.assignee}
                commentCount={issue.comments.length}
                createdBy={issue.createdBy}
                createdDate={issue.createdDate}
                labels={issue.labels}
                status={issue.status}
              />
            ))}
        </ul>
      ) : (
        <>
          <h2>Search result</h2>
          {searchQuery.isLoading ? (
            <p>Loading....</p>
          ) : (
            <>
              <p>{searchQuery.data?.count}</p>
              <ul className="issues-list">
                {searchQuery.data?.items?.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    number={issue.number}
                    assignee={issue.assignee}
                    commentCount={issue.comments.length}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    labels={issue.labels}
                    status={issue.status}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
