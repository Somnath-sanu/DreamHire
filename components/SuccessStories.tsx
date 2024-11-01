import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function SuccessStories() {
  return (
    <div className=" py-16 sm:py-24 inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] ">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Thanks to DreamHire, I found my dream job as a software engineer. The platform made it easy to connect with top companies and showcase my skills.",
    name: "Sarah Johnson",
    title: "Software Engineer at TechCorp",
  },
  {
    quote:
      "DreamHire's user-friendly interface and targeted job recommendations helped me land my ideal marketing position. I couldn't be happier with the results!",
    name: "Michael Chen",
    title: "Marketing Manager at GrowthMax",
  },
  {
    quote:
      "As a recent graduate, I was worried about finding a job. DreamHire made the process smooth and connected me with amazing opportunities in UX design.",
    name: "Emily Rodriguez",
    title: "UX Designer at DesignHub",
  },
];
