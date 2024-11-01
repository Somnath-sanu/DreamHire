"use client";
import { Job } from "@prisma/client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Briefcase, MapPin, Globe2, Banknote } from "lucide-react";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder1.png";
import Link from "next/link";
import Markdown from "./Markdown";

interface JobPageProps {
  job: Job;
}

export default function JobPage({
  job: {
    title,
    description,
    companyName,
    companyLogoUrl,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
  },
}: JobPageProps) {
  return (
    <div className="mx-auto max-w-7xl p-6 w-full">
      <Card className="overflow-hidden">
        <div className="flex items-center space-x-4 bg-secondary p-6">
          <Image
            src={companyLogoUrl || companyLogoPlaceholder}
            alt={`${companyName} logo`}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-xl text-muted-foreground">{companyName}</p>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-wrap gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Briefcase size={16} />
              {type}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <MapPin size={16} />
              {locationType}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Globe2 size={16} />
              {location || "Worldwide"}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Banknote size={16} />
              {formatMoney(salary)}
            </Badge>
          </div>

          <div>
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-semibold">Details</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">
                Read carefully before applying{" "}
              </p>
            </div>
          </div>
          {description && <Markdown>{description}</Markdown>}

          <div className="flex justify-center">
            {applicationUrl ? (
              <Link
                href={new URL(applicationUrl).origin}
                className="text-green-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {companyName}
              </Link>
            ) : (
              <span>{companyName}</span>
            )}
            {/* <Button asChild className="w-full sm:w-auto">
              <a href={applicationUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
