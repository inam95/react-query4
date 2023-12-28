import { useUserData } from "../api/queries";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { possibleStatus } from "../helpers/defaultData";
import { relativeDate } from "../helpers/relativeDate";
import { IssueHeaderProps } from "./IssueDetails";

export function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  comments,
  createdDate,
}: IssueHeaderProps) {
  const statusObj = possibleStatus.find((pStatus) => pStatus.id === status);
  const createdUser = useUserData(createdBy!);
  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span
          className={
            status === "done" || status === "cancelled" ? "closed" : "open"
          }
        >
          {status === "done" || status === "cancelled" ? (
            <GoIssueOpened />
          ) : (
            <GoIssueClosed />
          )}
          {statusObj?.label}
        </span>
        <span className="created-by">
          {createdUser.isLoading ? "..." : createdUser.data?.name}
        </span>{" "}
        Opened this issue {relativeDate(createdDate!)}
        {" 💨 "}
        {comments?.length} comments
      </div>
    </header>
  );
}
