export interface IIssue {
  id: number;
  title: string;
  number: number;
  assignee: string;
  comments: string[];
  createdBy: string;
  createdDate: string;
  labels: string[];
  status: string;
}

export interface ILabel {
  id: string;
  color: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  profilePictureUrl: string;
}

export interface Comment {
  id: string;
  comment: string;
  createdDate: string;
  createdBy: string;
}

export interface IssueSearchResponse {
  count: number;
  items: IIssue[];
}
