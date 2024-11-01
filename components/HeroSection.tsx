
import LoadingButton from "./LoadingButton";

export function HeroSection() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in">
      <div className="py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Find Your Dream Job with</span>
            <span className="block text-primary uppercase underline underline-offset-8 decoration-wavy tracking-wide font-serif pt-2">DreamHire</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
            Discover thousands of job opportunities from top companies. Your
            next career move starts here.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md">
            
              <LoadingButton
                href="/jobs"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  bg-primary md:py-4 md:text-lg md:px-10 text-card hover:opacity-95"
              >
                Get Started Now
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
