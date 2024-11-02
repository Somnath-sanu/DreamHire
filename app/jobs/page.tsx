/* eslint-disable @typescript-eslint/no-unused-vars */
import { JobResults } from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  title?: string;
  location?: string;
  jobType?: string;
  page?:string
}

async function Page({ searchParams }: { searchParams: Promise<PageProps> }) {
  const { title, location, jobType, page } = await searchParams;

  const filterValues: JobFilterValues = {
    title,
    location,
    jobType,
    
  };

  // console.log({filterValues});

  return (
    <main className="m-auto my-10 max-w-7xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h2>
          {" "}
          Your next career move starts here. Discover your dream job today!{" "}
        </h2>
        <p className="text-muted-foreground">
          Unlock your potential, land the job you deserve.
        </p>
      </div>
      <JobResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
    </main>
  );
}

export default Page;
