"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Microscope, GraduationCap, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Preloader from "@/components/Preloader/Preloader";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    const timer = setTimeout(() => {
      gsap.to(window, { duration: 1, scrollTo: { y: 0, autoKill: false } });
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
        {/* Announcement Banner */}
        <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-3 text-center text-sm text-white">
          Empowering education through 3D technology - Special pricing for
          schools and universities!
        </div>

        {/* Navigation */}
        <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold">Think3D</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm hover:text-indigo-400">
                Home
              </a>
              <a href="#" className="text-sm hover:text-indigo-400">
                Features
              </a>
              <a href="#" className="text-sm hover:text-indigo-400">
                Resources
              </a>
              <a href="#" className="text-sm hover:text-indigo-400">
                Pricing
              </a>
              <SignedOut>
                <SignInButton>
                  <button className="border-indigo-500 py-2 px-4 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-md transition-all duration-200">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <Button className="bg-indigo-500 hover:bg-indigo-600">
                Get Started - Free for Students
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-1 text-sm">
                <Microscope className="h-4 w-4 text-indigo-400" />
                <span>Transform Learning with 3D Models</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Turn Textbook Images into Interactive 3D Models
                <span className="text-indigo-400">.</span>
              </h1>

              <p className="text-lg text-zinc-400">
                Convert any educational image into detailed 3D models instantly.
                Perfect for biology specimens, molecular structures, historical
                artifacts, and more.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600">
                  <Upload className="mr-2 h-5 w-5" />
                  Try It Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"
                >
                  <BookOpen className="mr-2 h-5 w-5 " />
                  View Learning Resources
                </Button>
              </div>
            </div>

            <div className="relative rounded-lg border border-zinc-800 bg-black p-6">
              <Tabs defaultValue="biology" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="biology">Biology</TabsTrigger>
                  <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="aspect-square rounded-lg bg-zinc-800">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Cell Structure"
                        width={200}
                        height={200}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">Cell Structure</p>
                  </Card>
                  <Card className="border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="aspect-square rounded-lg bg-zinc-800">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="DNA Model"
                        width={200}
                        height={200}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">DNA Model</p>
                  </Card>
                </div>

                <div className="mt-6 rounded-lg border border-dashed border-zinc-700 p-8 text-center">
                  <Upload className="mx-auto h-8 w-8 text-zinc-500" />
                  <p className="mt-2 text-sm text-zinc-400">
                    Drag and drop your educational images here
                  </p>
                  <p className="text-xs text-zinc-600">
                    Supported formats: JPG, PNG, JPEG - Max size: 25MB
                  </p>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 grid gap-8 md:grid-cols-3">
            <Card className="border-zinc-800 bg-zinc-900/50 p-6">
              <BookOpen className="h-12 w-12 text-indigo-400" />
              <h3 className="mt-4 text-xl font-bold">Enhanced Learning</h3>
              <p className="mt-2 text-zinc-400">
                Turn flat textbook images into interactive 3D models that
                students can explore from every angle.
              </p>
            </Card>
          </div>
        </main>

        {/* Remove this line if AnimatedFooter is not available */}
      </div>
    </>
  );
}
