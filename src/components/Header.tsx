"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd, Heart, Paintbrush } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <GalleryVerticalEnd className="h-8 w-auto sm:h-10 text-[#2a9d8f]" />
              <span className="ml-2 text-xl font-bold text-gray-700">
                LucideDesign
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {!isLoading && !user && (
              <>
                <Button variant="outline" className="ml-8 whitespace-nowrap">
                  <a href="/api/auth/login">Sign in</a>
                </Button>
                <Button className="ml-8 whitespace-nowrap">
                  <a href="/api/auth/login">Sign up</a>
                </Button>
              </>
            )}
            {user && (
              <div className="flex items-center gap-4">
                {/* <Link href={"/my-designs"}>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="flex items-center justify-center"
                  >
                    <Paintbrush size={36} />
                  </Button>
                </Link>
                <Link href="/favourites">
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="flex items-center justify-center"
                  >
                    <Heart size={36} />
                  </Button>
                </Link> */}
                <Link href={"/api/auth/logout"}>
                  <img
                    src={user.picture ?? ""}
                    alt="Profile"
                    className="rounded-full"
                    width="36"
                    height="36"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
