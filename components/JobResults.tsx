/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import JobListItem from "./JobListItem";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export async function JobResults({ filterValues }: JobResultsProps) {
  const { title, location, jobType } = filterValues;

  /**
   * I will search title in entire field of schema , cause we don't have query
   */

  const searchFilter: Prisma.JobWhereInput = title
    ? {
        OR: [
          { title: { search: title, mode: "insensitive" } },
          { companyName: { search: title, mode: "insensitive" } },
          { type: { search: title, mode: "insensitive" } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      jobType ? { type: jobType } : {},
      location ? { location } : {},

      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center text-3xl md:text-4xl lg:text-5xl font-bold">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
