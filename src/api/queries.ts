import { useQuery } from "@tanstack/react-query";
import {
  Comment,
  IIssue,
  ILabel,
  IUser,
  IssueSearchResponse,
} from "../types/api-types";
import { fetchWithError } from "../helpers/fetch-utils";

export const fetchIssues = (
  labelsString: string,
  statusString: string
): Promise<IIssue[]> =>
  fetchWithError(`/api/issues?${labelsString}${statusString}`);

export const fetchIssue = (issueNumber: string): Promise<IIssue> =>
  fetchWithError(`/api/issues/${issueNumber}`);

export const fetchIssueComments = (issueNumber: string): Promise<Comment[]> =>
  fetchWithError(`/api/issues/${issueNumber}/comments`);

export const fetchLabels = (): Promise<ILabel[]> =>
  fetchWithError("/api/labels");

export const fetchUsers = (): Promise<IUser[]> => fetchWithError(`/api/users`);

export const fetchUser = (id: string): Promise<IUser> =>
  fetchWithError(`/api/users/${id}`);

export const fetchIssuesSearch = (
  searchValue: string
): Promise<IssueSearchResponse> =>
  fetchWithError(`/api/search/issues?q=${searchValue}`);

export function useFetchIssues(labels: string[], status: string) {
  const statusString = status ? `&status=${status}` : "";
  return useQuery(
    ["issues", { labels, status }],
    () => {
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      return fetchIssues(labelsString, statusString);
    },
    {
      staleTime: 1000 * 60,
    }
  );
}

export function useUserData(userId: string) {
  return useQuery(["users", userId], () => fetchUser(userId), {
    staleTime: 1000 * 60 * 5,
  });
}

export function useLabelsData() {
  return useQuery(["labels"], fetchLabels, {
    staleTime: 1000 * 60 * 60,
  });
}

export function useIssueData(issueNumber: string) {
  return useQuery(["issues", issueNumber], () => fetchIssue(issueNumber));
}

export function useIssueComment(issueNumber: string) {
  return useQuery(["issues", issueNumber, "comments"], () =>
    fetchIssueComments(issueNumber)
  );
}

export function useSearchQuery(searchValue: string) {
  return useQuery(
    ["issues", "search", searchValue],
    () => fetchIssuesSearch(searchValue),
    {
      enabled: searchValue.length > 0,
    }
  );
}
