/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Progress } from "@/components/ui/progress";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { useForm } from "react-hook-form";
import { createJobSchema, createJobValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { X } from "lucide-react";
import LocationInput from "./LocationInput";
import { draftToMarkdown } from "markdown-draft-js";
import RichTextEditor from "@/components/TextEditor";
import LoadingButton from "./LoadingButton";
import Image from "next/image";
import { pokemons } from "./Pokemon";
import { createJobPosting } from "@/app/jobs/new/actions";

export default function MultiStepForm() {
  // const [step, setStep] = useState<number>(0);
  const stepRef = useRef(0);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  // const totalSteps = 8;
  // const progress = ((step + 1) / totalSteps) * 100;

  const [progress, setProgress] = useState(((stepRef.current + 1) / 8) * 100);
  const forceUpdate = () => setProgress(((stepRef.current + 1) / 8) * 100);

  const form = useForm<createJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setFocus,
    setValue,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: createJobValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    await new Promise((res) => setTimeout(res, 2000));

    console.log(values);

    try {
      await createJobPosting(formData);
    } catch (error) {
      console.error("Something went wrong, please try again.", error);
    }
  }

  const handleNext = async () => {
    const fields = Object.keys(formSteps[stepRef.current].validation);
    // console.log({ fields });

    const isValid = await trigger(fields as any);
    // console.log({ isValid });
    // console.log({ step: stepRef.current });

    if (isValid && stepRef.current < formSteps.length - 1) {
      // setStep(step + 1);
      stepRef.current++;
      forceUpdate();
    }
  };

  const handlePrev = () => {
    // if (step > 0) setStep(step - 1);
    if (stepRef.current > 0) {
      stepRef.current -= 1;
      forceUpdate();
    }
  };

  useEffect(() => {
    const handleEnterClick = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        console.log(e);
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener("keydown", handleEnterClick);

    return () => {
      document.removeEventListener("keydown", handleEnterClick);
    };
  }, []);

  /**
   * keyPress is depreciated , use keyDown
   */

  const formSteps = [
    {
      title: `Job Title`,
      validation: { title: true },
      component: (
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title <span className="text-red-500 text-lg">*</span></FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Frontend Developer"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("title");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      title: "Job Type",
      validation: { type: true },
      component: (
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job type <span className="text-red-500 text-lg">*</span></FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(e: string) => {
                    field.onChange(e);
                    trigger("type");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      title: "Company Information",
      validation: { companyName: true },
      component: (
        <FormField
          control={control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company <span className="text-red-500 text-lg">*</span></FormLabel>
              <FormControl>
                <Input
                  placeholder="Your company name"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("companyName");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      title: "Company Logo",
      validation: { companyLogo: true },
      component: (
        <>
          <FormField
            control={control}
            name="companyLogo"
            render={({ field: { value, ...fieldValue } }) => (
              <FormItem>
                <FormLabel>
                  Company logo
                  {imageFile && (
                    <span className="ml-3 text-xs text-green-500">
                      {imageFile.name}
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    {...fieldValue}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        fieldValue.onChange(file);
                        setImageFile(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imageFile && (
            <span
              className={"ml-3 text-xs text-red-500 cursor-pointer"}
              onClick={() => {
                setValue("companyLogo", undefined, {
                  shouldValidate: true,
                });
                setImageFile(undefined);
              }}
            >
              Deselect
            </span>
          )}
        </>
      ),
    },
    {
      title: "Location Type",
      validation: { locationType: true },
      component: (
        <FormField
          control={control}
          name="locationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Type <span className="text-red-500 text-lg">*</span></FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(e) => {
                    field.onChange(e);
                    trigger("locationType");
                    if (e === "Remote") {
                      trigger("location");
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationTypes.map((locationType) => (
                      <SelectItem value={locationType} key={locationType}>
                        {locationType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      title: "Office Location",
      validation: { location: true },
      component: (
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office location</FormLabel>
              <FormControl>
                <LocationInput
                  onLocationSelected={(location) => {
                    field.onChange(location);
                    trigger("location");
                  }}
                  ref={field.ref}
                />
              </FormControl>
              {watch("location") && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setValue("location", "", { shouldValidate: true });
                    }}
                  >
                    <X size={20} />
                  </button>
                  <span className="text-sm">{watch("location")}</span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      title: "Application Method",
      validation: { applicationEmail: true, applicationUrl: true },
      component: (
        <div className="space-y-2">
          <Label>How to apply</Label>
          <div className="flex justify-between gap-4">
            <FormField
              control={control}
              name="applicationEmail"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger("applicationEmail");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="self-center">or</span>
            <FormField
              control={control}
              name="applicationUrl"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      placeholder="Website"
                      type="url"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger("applicationEmail");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Job Description & Salary",
      validation: { description: true },
      component: (
        <div className="space-y-5">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label onClick={() => setFocus("description")}>
                  Description
                </Label>
                <FormControl>
                  <RichTextEditor
                    onChange={(draft) => {
                      const desValue = draftToMarkdown(draft);
                      field.onChange(draftToMarkdown(draft));
                      trigger("description");
                      // console.log(draft);
                      // console.log(desValue);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary <span className="text-red-500 text-lg">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="number"
                    placeholder="Annual salary in USD"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center  py-16 flex-col inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full max-w-3xl space-y-5 text-center px-4">
        <h2 className="text-3xl font-bold">Find your perfect developer</h2>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>

      <div className="w-full max-w-3xl px-4 mt-8">
        <Progress value={progress} className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-semibold text-md text-center font-mono w-full">
                    {/* {formSteps[stepRef.current].title} */}
                    {/* {Math.round(progress)} % completed */}
                    <Image
                      src={pokemons[stepRef.current]}
                      height={50}
                      width={50}
                      alt="pokemon"
                      className="object-cover mx-auto"
                    />
                  </h3>
                  <p className="text-muted-foreground text-sm pt-2">
                    Step {stepRef.current + 1} of {formSteps.length}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={stepRef.current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formSteps[stepRef.current].component}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between pt-8">
                  <Button
                    type="button"
                    onClick={handlePrev}
                    disabled={stepRef.current === 0 || isSubmitting}
                    variant="outline"
                  >
                    Previous
                  </Button>

                  {stepRef.current === formSteps.length - 1 ? (
                    <LoadingButton type="submit" className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-2 py-2 rounded-xl " loading={isSubmitting}>
                      Submit Job Posting
                    </LoadingButton>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={Object.keys(
                        formSteps[stepRef.current].validation
                      ).some((field) => errors[field as keyof createJobValues])}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
