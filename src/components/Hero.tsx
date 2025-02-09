import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-700 sm:text-5xl md:text-6xl lg:leading-[1.2]">
              The Background <br /> for Designers
            </h1>
            <p className="mt-6 max-w-md text-lg text-gray-500 sm:text-xl">
              Create custom watermarks using beautiful Lucide icons related to
              your project.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                <Link href={"#watermark"}>Start for free</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href={"https://lucide.dev/icons/"} target="_blank">
                  View Icons
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              No credit card required.
            </p>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg opacity-20 blur-3xl" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-lg border shadow-2xl">
                <div className="flex items-center gap-2 border-b p-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    src="/images/watermark.svg"
                    alt="Watermark Demo"
                    className="rounded-b-md shadow-lg w-full h-full object-cover"
                    layout="responsive"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
