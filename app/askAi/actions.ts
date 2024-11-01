/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const getAIRecommendations = async (
  qualifications: string
): Promise<string[]> => {
  const availableJobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      title: true,
      description: true,
      slug: true,
    },
  });

  const jobsData = availableJobs.map(({ title, description, slug }) => slug);

  // console.log({ jobsData });

  const result = await model.generateContent(
    "Based on the qualifications filter job title that will suits my qualifications and better option for me and return me all such titles  seperated by comma give me only job titles as a response nothing more and if no such title available just respond a empty string , give complete slug title dont remove anything  here is my qualifications " +
      qualifications +
      " Here is the list of all job titles slug keep this at it is dont change anything try to understand from these slug and return slug if it matches with qualifications as it is " +
      jobsData
  );

  // console.log({ result: result.response.text() });

  const ans = result.response.text().split(",");
  return ans;

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
  // return [
  //   "Software Engineer",
  //   "Data Scientist",
  //   "UX Designer",
  //   "Product Manager",
  //   "DevOps Engineer",
  // ];
};
