import { jobTypes } from "@/lib/job-types";
import prisma from "@/lib/prisma";

import Form from "next/form";

export async function FilterSection() {
  const locations = (await prisma.job
    .findMany({
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[];

  return (
    <div className="bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Form action="/jobs" className="mt-6" scroll={false}>
            <div className="shadow-sm rounded-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="px-4 py-2 bg-white sm:p-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="mt-1 focus:ring-primary  block w-full shadow-sm sm:text-sm rounded-md px-3 py-2"
                    placeholder="e.g. Software Engineer"
                  />
                </div>

                <div className="px-4 py-2 bg-white sm:p-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full pl-1 pr-5 py-2 text-base border-gray-300 rounded-md"
                    defaultValue={""}
                  >
                    <option value="" hidden>
                      All
                    </option>
                    {locations.map((location, id) => (
                      <option value={location} key={id}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="px-4 py-2 bg-white sm:p-6">
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    className="mt-1 block w-full pl-1 pr-5 py-2 text-base border-gray-300 rounded-md"
                    defaultValue={""}
                  >
                    <option value="" hidden>
                      All
                    </option>
                    {jobTypes.map((job, id) => (
                      <option value={job} key={id}>
                        {job}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-primary text-background hover:opacity-90 "
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
