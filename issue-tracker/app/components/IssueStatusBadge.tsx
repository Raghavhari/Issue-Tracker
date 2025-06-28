import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  OPEN: { label: "Open", color: "red" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
