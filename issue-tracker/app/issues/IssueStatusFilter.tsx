"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { Status } from "../generated/prisma";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);

        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (searchParams.get("order"))
          params.append("order", searchParams.get("order")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push(`/issues/${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
