import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center mt-10 gap-10">
      <SignIn />
    </main>
  );
}
