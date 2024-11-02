/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import JobListItem from "./JobListItem";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

export async function JobResults({ filterValues, page = 1 }: JobResultsProps) {
  const { title, location, jobType } = filterValues;

  /**
   * I will search title in entire field of schema , cause we don't have query
   */

  if (page <= 0) {
    page = 1;
  }

  const limit = 6;

  const skip = (page - 1) * limit;

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

  const jobsPromise = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip,
  });

  const countPromise = prisma.job.count({
    where,
  });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

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
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / limit)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { title, location, jobType },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(title && { title }),
      ...(location && { location }),
      ...(jobType && { jobType }),
      page: page.toString(),
    });

    return `/jobs/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between py-4">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold font-serif text-green-600 animate-pulse",
          currentPage <= 1 && "invisible"
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold font-serif text-green-600 animate-pulse",
          currentPage >= totalPages && "invisible"
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
