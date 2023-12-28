import type { FC } from "react";
import { useUserData } from "../api/queries";
import { relativeDate } from "../helpers/relativeDate";

interface CommentProps {
  comment: string;
  createdDate: string;
  createdBy: string;
}

const Comment: FC<CommentProps> = ({ comment, createdBy, createdDate }) => {
  const userQuery = useUserData(createdBy);
  if (userQuery.isLoading)
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="comment">
      <img src={userQuery.data?.profilePictureUrl} alt="Comment avatar" />
      <div>
        <div className="comment-header">
          <span>{userQuery.data?.name}</span> commented{" "}
          <span>{relativeDate(createdDate)}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
};
export default Comment;
