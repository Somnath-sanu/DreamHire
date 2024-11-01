/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  LucideIcon,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { formatMoney, relativeDate } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Job } from "@prisma/client";
import Link from "next/link";
import LoadingButton from "./LoadingButton";

export async function FeaturedJobs() {
  const featuredJobs = await prisma.job.findMany({
    orderBy: {
      salary: "desc",
    },
    take: 3,
  });

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Featured Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job: Job) => (
            <Link href={`/jobs/${job.slug}`} key={job.id}>
              <Card className="overflow-hidden hover:shadow-md cursor-pointer">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 truncate">
                    <InfoItem icon={Briefcase} text={job.type} />
                    <InfoItem icon={MapPin} text={job.locationType} />
                    <InfoItem
                      icon={Globe2}
                      text={job.location || "Worldwide"}
                    />
                    <InfoItem icon={Banknote} text={formatMoney(job.salary)} />
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-nowrap text-sm text-muted-foreground">
                      <Clock size={14} />
                      {relativeDate(job.createdAt)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="overflow-hidden">
                  <div className="w-full flex justify-end items-center">
                    <Button className="text-center border border-transparent">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <LoadingButton
            href={`/jobs`}
            className="py-3 px-2  w-full flex items-center justify-center border border-transparent text-base font-medium rounded-md  bg-primary text-card hover:opacity-95"
          >
            View All Jobs
          </LoadingButton>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground text-balance break-all">
      <Icon size={16} className="text-primary" />
      {text}
    </div>
  );
}
