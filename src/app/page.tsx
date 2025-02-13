"use client";
import Community from "@/components/Community";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Watermark from "@/components/Watermark";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {!user && !isLoading && <Hero />}
        <Watermark />
        {!user && !isLoading && <Cta />}
        {user && <Community />}
      </main>
      <Footer />
    </div>
  );
}
