import { useParams } from "react-router-dom";
import { useIssueComment, useIssueData } from "../api/queries";
import { IIssue } from "../types/api-types";
import { IssueHeader } from "./IssueHeader";
import Comment from "./Comment";

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number as string);
  const commentsQuery = useIssueComment(number as string);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />
          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>Loading....</p>
              ) : (
                commentsQuery.data?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside></aside>
          </main>
        </>
      )}
    </div>
  );
}

export type IssueHeaderProps = Partial<IIssue>;
