import { useLabelsData } from "../api/queries";

export function Label({ label }: { label: string }) {
  const labelsQuery = useLabelsData();
  if (labelsQuery.isLoading) return null;
  const labelObj = labelsQuery.data?.find(
    (queryLabel) => queryLabel.id === label
  );
  if (!labelObj) return null;
  return (
    <span className={`label ${labelObj.color} ${labelObj.name}`}>
      {labelObj.name}
    </span>
  );
}
