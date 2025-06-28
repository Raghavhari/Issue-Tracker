import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/app/lib/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchData = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  if (typeof parseInt(id) !== "number") notFound();

  const session = await getServerSession(authOptions);
  const issue = await fetchData(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchData(parseInt(id));
  if (!issue) {
    return {
      title: "Issue Not Found - Issue Tracker",
      description: "The requested issue could not be found.",
    };
  }

  return {
    title: `${issue.title} | Issue #${issue.id} - Issue Tracker`,
    description: `View details, assignee, and status for issue #${issue.id}: ${issue.title}. Stay updated with the latest information on this tracked issue.`,
  };
}

export default IssueDetailsPage;
