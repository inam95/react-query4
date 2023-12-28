import { ChangeEvent } from "react";

interface StatusSelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
const possibleStatus = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "Todo" },
  { id: "inProgress", label: "In Progress" },
  { id: "done", label: "Done" },
  { id: "cancelled", label: "Cancelled" },
];
export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <select
      name="status"
      value={value}
      onChange={onChange}
      className="status-select"
    >
      <option value="">Select a status to filter</option>
      {possibleStatus.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
