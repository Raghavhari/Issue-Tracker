import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueCharts from "./IssueCharts";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { prisma } from "./lib/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary stats={{ open, inProgress, closed }} />
        <IssueCharts stats={{ open, inProgress, closed }} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description:
    "Monitor, analyze, and manage your team's issues in real-time with the Issue Tracker dashboard. Gain actionable insights, track progress, and boost productivity with our comprehensive issue management solution.",
  keywords: [
    "issue tracker",
    "dashboard",
    "real-time",
    "issue management",
    "analytics",
    "team productivity",
    "project management",
    "track issues",
    "bug tracking",
  ],
  openGraph: {
    title: "Issue Tracker - Dashboard",
    description:
      "Monitor, analyze, and manage your team's issues in real-time with the Issue Tracker dashboard. Gain actionable insights, track progress, and boost productivity.",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dbnj4pw6d/image/upload/Issue_Tracker_kir0a5.png",
        width: 1200,
        height: 630,
        alt: "Issue Tracker - Dashboard",
      },
    ],
  },
};
