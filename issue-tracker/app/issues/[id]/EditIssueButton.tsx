"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { RxPencil2 } from "react-icons/rx";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <RxPencil2 />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
