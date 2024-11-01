"use client";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder1.png";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import {
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  LucideIcon,
  MapPin,
} from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/ui/card";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItemProps) {
  return (
    <div>
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="flex flex-col gap-6 p-6 sm:flex-row">
          <div className="flex-shrink-0 self-center sm:self-start">
            <Image
              src={companyLogoUrl || companyLogoPlaceholder}
              alt={`${companyName} logo`}
              width={100}
              height={100}
              className="rounded-lg"
            />
          </div>
          <div className="flex-grow space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-primary">{title}</h2>
              <p className="text-lg text-muted-foreground">{companyName}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <InfoItem icon={Briefcase} text={type} />
              <InfoItem icon={MapPin} text={locationType} />
              <InfoItem icon={Globe2} text={location || "Worldwide"} />
              <InfoItem icon={Banknote} text={formatMoney(salary)} />
            </div>
          </div>
          <div className="mt-4 flex flex-col items-end justify-between sm:mt-0">
            <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {type}
            </span>
            <span className="flex items-center gap-1.5 text-nowrap text-sm text-muted-foreground">
              <Clock size={14} />
              {relativeDate(createdAt)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoItem({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon size={16} className="text-primary" />
      {text}
    </div>
  );
}
