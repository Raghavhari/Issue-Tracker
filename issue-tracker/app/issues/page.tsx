import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import Pagination from "../components/Pagination";
import { Status } from "../generated/prisma";
import { prisma } from "../lib/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const { status, orderBy, order, page } = resolvedSearchParams;

  const session = await getServerSession(authOptions);

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;

  const orderByClause = columnNames.includes(orderBy)
    ? { [orderBy]: order === "asc" ? "asc" : "desc" }
    : undefined;

  const currentpage = parseInt(page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
    orderBy: orderByClause,
    skip: (currentpage - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: validStatus },
  });

  return (
    <Flex direction="column" gap="3">
      {session && <IssueActions />}
      <IssueTable searchParams={resolvedSearchParams} issues={issues} />
      <Pagination
        currentPage={currentpage}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description:
    "Stay on top of your team's work with the Issue Tracker Dashboard. View, filter, and manage issues for better productivity and collaboration.",
  keywords: [
    "issue tracker",
    "dashboard",
    "project management",
    "track issues",
    "collaboration",
    "productivity",
  ],
  openGraph: {
    title: "Issue Tracker - Issue List",
    description:
      "Stay on top of your team's work with the Issue Tracker Dashboard. View, filter, and manage issues for better productivity and collaboration.",
    type: "website",
  },
};

export default IssuePage;
