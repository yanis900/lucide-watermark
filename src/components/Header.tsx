"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GalleryVerticalEnd,
  Heart,
  LogOut,
  Paintbrush,
  User,
} from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";

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
              </>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={'icon'} className="p-0 rounded-full">
                    <Avatar className="w-12 h-12">
                      <img
                        src={user.picture || '/images/placeholder.svg'}
                        alt="Profile"
                        className="rounded-full"
                      />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User size={16} />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/api/auth/logout"
                      className="flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={16} />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
