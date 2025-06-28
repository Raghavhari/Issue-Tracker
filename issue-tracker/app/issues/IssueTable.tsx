import { Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { RxArrowDown, RxArrowUp } from "react-icons/rx";
import { IssueStatusBadge, Link } from "../components";
import { Issue, Status } from "../generated/prisma";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const { orderBy, order } = searchParams;

  const getNextOrder = (currentColumn: keyof Issue) => {
    if (orderBy !== currentColumn) return "asc";

    return order === "asc" ? "desc" : "asc";
  };

  const issueLength = issues.length > 0;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              {issues.length > 1 ? (
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      order: getNextOrder(column.value),
                    },
                  }}
                >
                  {column.label}
                  {column.value === orderBy &&
                    (order === "asc" ? (
                      <RxArrowUp className="inline" />
                    ) : (
                      <RxArrowDown className="inline" />
                    ))}
                </NextLink>
              ) : (
                <Text>{column.label}</Text>
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issueLength ? (
          issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell>
              <Text align="center">No Issue Found</Text>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
