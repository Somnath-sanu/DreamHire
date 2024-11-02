"use client";

import FormSubmitButton from "@/components/FormSubmitButton";

import { Job } from "@prisma/client";

import { approveSubmission, deleteJob } from "./actions";
import { useActionState } from "react";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useActionState(approveSubmission, undefined);

  // formState -> whatever we return from server actions

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useActionState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
