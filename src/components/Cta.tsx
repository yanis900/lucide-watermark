import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <div className="bg-[#2a9d8f]">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Elevate Your Projects.</span>
          <span className="block">Start Creating Watermarks today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-white">
          Improve your design, lorem ipsum, and take your projects
          to the next level with <span className="underline">LucideDesign</span>.
        </p>
        <Button size="lg" className="mt-8 w-full sm:w-auto" variant="secondary">
          Sign up for free
        </Button>
      </div>
    </div>
  );
}
