import LoadingButton from "./LoadingButton";

export function HowItWorks() {
  return (
    <section className="bg-secondary py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How DreamHire Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find your dream job in just a few simple steps
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-4 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900">
                Search Jobs
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Browse through thousands of job listings or use our advanced
                search to find the perfect match for your skills and experience.
              </p>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900">
                Apply with Ease
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Create your profile once and apply to multiple jobs with just a
                click. Customize your application for each position
                effortlessly.
              </p>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900">
                Get Hired
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Connect with top employers, schedule interviews, and land your
                dream job. We&apos;re here to support you every step of the way.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <LoadingButton
            href="/jobs"
            className="px-6 py-2 w-full flex items-center justify-center border border-transparent text-base font-medium rounded-md  bg-primary text-card hover:opacity-95"
          >
            Get Started Now
          </LoadingButton>
        </div>
      </div>
    </section>
  );
}
