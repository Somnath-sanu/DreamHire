import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <div className="py-16 sm:py-24 inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full px-4 py-10">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I create an account on DreamHire?</AccordionTrigger>
            <AccordionContent>
            To create an account, click on the &quot;Sign Up&quot; button in the top right corner of the homepage. Fill in your details, including your name, email address, and password. Once you&apos;ve completed the form, click &quot;Create Account&quot; and you&apos;re all set OR Do with Google!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it free to apply for jobs on DreamHire?</AccordionTrigger>
            <AccordionContent>
              Yes. Yes, applying for jobs on DreamHire is completely free for job seekers. We believe in connecting talented individuals with great opportunities without any cost barriers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I make my profile stand out to employers?</AccordionTrigger>
            <AccordionContent>
            To make your profile stand out, make sure to complete all sections thoroughly. Highlight your skills, experience, and achievements. Add a professional photo and keep your information up-to-date. Consider adding a portfolio or work samples if applicable to your field.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
