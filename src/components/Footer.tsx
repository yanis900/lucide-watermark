import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Github</span>
            <Github className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1 flex flex-col items-center md:items-start gap-3">
          <p className="text-center text-sm text-gray-400">
            Icons provided by{" "}
            <a
              href="https://lucide.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Lucide Icons
            </a>
          </p>
          <p className="text-center text-base text-gray-400">
            &copy; 2024 LucideDesign. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
