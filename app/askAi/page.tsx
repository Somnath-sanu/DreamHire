/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { getAIRecommendations } from "./actions";
import { fromSlug, toSlug } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useAiResult } from "@/store/useAiResult";

export default function Page() {
  const [qualifications, setQualifications] = useState("");
  // const [jobs, setJobs] = useState<string[]>([]); // Todo: use zustand and clear suggessions
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { jobs, setJobs } = useAiResult();

  const router = useRouter();

  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const recommendations = await getAIRecommendations(qualifications);
      setJobs(recommendations);
      console.log({ recommendations });

      if (
        recommendations.filter(
          (job) => job.length > 0 && job !== "," && job !== " \n"
        ).length === 0
      ) {
        // don't use jobs.length
        toast.error("No Job found based on your current knowledge");
      }
    } catch (err) {
      setError("Failed to get job recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen  flex   py-16 flex-col inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] mx-auto">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-green-500 mb-2 inline-block text-transparent bg-clip-text tracking-tight">
            AI Job Matcher
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect job with the power of AI
          </p>
        </header>

        <Card className="max-w-[400px] sm:max-w-full mx-auto">
          <CardHeader>
            <CardTitle className="max-w-3xl mx-auto text-balance text-center">
              <span className="block text-primary">
                Tell us about your qualifications
              </span>
            </CardTitle>
            <CardDescription className="max-w-3xl mx-auto text-balance text-center text-secondary-foreground">
              Describe your skills, experience, and education. Our AI will match
              you with suitable job opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="E.g., I have a bachelor's degree in Computer Science with 3 years of experience in web development using React and Node.js..."
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="w-full flex justify-end items-center">
                <LoadingButton
                  type="submit"
                  className="w-full py-3 px-2 flex items-center justify-center border border-transparent text-base font-medium rounded-md  bg-primary text-card hover:opacity-95"
                  loading={isLoading}
                >
                  Find matching jobs
                </LoadingButton>
              </div>
            </form>
          </CardContent>
        </Card>

        {error && <div className="text-red-500 text-center">{error}</div>}

        {jobs.length > 0 && (
          <Card className="max-w-[400px] sm:max-w-full mx-auto">
            <CardHeader>
              <CardTitle>Recommended Jobs</CardTitle>
              <CardDescription>
                Based on your qualifications, here are some job roles that might
                be a good fit:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {jobs
                  .filter(
                    (job) => job.length > 0 && job !== "," && job !== " \n"
                  )
                  .map((job, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer"
                      onClick={() => {
                        router.push(`/jobs/${job}`);
                      }}
                    >
                      <Briefcase className="mr-3 text-blue-500" />
                      <span className="text-lg font-medium text-gray-800">
                        {fromSlug(job)}
                      </span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
