import { prisma } from "@/app/lib/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueFormLoader";

const EditIssueDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (typeof parseInt(id) !== "number") notFound();

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssueDetails;
