import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/utils";
import { Bot, ShieldCheck } from "lucide-react";
import Image from "next/image";
import DreamHireLogo from "@/assets/logo.png";

export default async function Navbar() {
  const user = await currentUser();
  
  return (
    <header className="sticky top-0  mx-auto px-4 sm:px-6 lg:px-8 bg-white/50 shadow z-[100]">
      <nav className="w-full">
        <div className="flex items-center justify-between h-16 gap-1 sm:gap-3">
          <Link href={"/"} className="flex-shrink-0 sm:flex items-center gap-2 hidden">
            <Image
              src={DreamHireLogo}
              alt="logo"
              height={20}
              width={20}
              className="object-cover"
            />
            <span className="text-2xl font-bold text-primary">DreamHire</span>
          </Link>
          <div className="flex items-center justify-center gap-1 sm:gap-3">
            {user && isAdmin(user) && (
              <Button variant={"link"} asChild>
                <Link href={`/admin`} className="flex items-center gap-0.5">
                  <ShieldCheck className="h-[1.2rem] w-[1.2rem]" />
                  <span>Admin </span>
                </Link>
              </Button>
            )}
            <Button variant={"link"} asChild>
              <Link href={`/askAi`} className="flex items-center gap-0.5">
                <Bot className="h-[1.2rem] w-[1.2rem]" />
                <span>AI job finder </span>
              </Link>
            </Button>

            <Button
              className="bg-primary text-white"
              suppressHydrationWarning
              asChild
            >
              <Link href={"/jobs/new"}>Post a Job</Link>
            </Button>

            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}
