"use client";

import { appName } from "@/lib/utils";
import { Headset, HelpCircle, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";
import appLogo from "../../../public/images/logo-transparent-png.png";
import dynamic from "next/dynamic";

// Dynamically import GlobeAnimation to ensure client-side rendering
const GlobeAnimation = dynamic(() => import("../../components/ui/globe-animation"), {
  ssr: false,
});

const AuthLayout = ({ children }: PropsWithChildren) => {
  const features = [
    {
      icon: <Headset className="w-6 h-6 text-primary" />,
      title: "24/7 Customer Support",
      description: "Get real-time assistance anytime from our expert team.",
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-primary" />,
      title: "Knowledge Base",
      description: "Browse helpful guides and FAQs tailored to your needs.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Team Collaboration",
      description: "Collaborate with team members for faster issue resolution.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Secure Ticketing",
      description: "Manage and track support requests securely and efficiently.",
    },
  ];

  return (
    <section className="grid md:grid-cols-12 sm:grid-cols-8 grid-cols-4 gap-4 px-4 min-h-screen bg-[#1152ea]">
      <aside
        style={{
          backgroundImage: `url('/images/sidebarBG.jpg')`, // Optional: Update background image for support context
          backgroundSize: "cover",
          backgroundPosition: "center",
          flex: 1,
          overflowY: "auto",
          zIndex: 10,
        }}
        className="xl:col-span-7 md:col-span-6 col-span-4 bg-[#000936] rounded-[1.25rem] hidden md:flex flex-col mt-4 pt-12 pl-12 -mr-4"
      >
        <header className="space-y-6 mb-12">
          <div className="space-y-2.5 bg-background p-4">
            <h1 className="text-3xl text-primary font-bold">
              Support That’s Always There
            </h1>
            <p className="text-primary text-lg max-w-md">
              Welcome to the {appName} Support Center. We're here to help you solve
              issues quickly, collaborate efficiently, and keep your operations running smoothly.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-primary bg-background p-4">
              Empowering 50,000+ users with reliable support tools
            </p>
          </div>
        </header>

        {/* Add GlobeAnimation */}
        <div className="flex justify-center mb-12">
          <GlobeAnimation />
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12 ">
          {features.map((feature, index) => (
            <div key={index} className="space-y-2 bg-background p-4 ">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-primary">{feature.title}</h3>
              <p className="text-sm text-primary">{feature.description}</p>
            </div>
          ))}
        </div>

        <footer className="mt-auto bg-background p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-primary">Private & Secure</p>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-primary">
                99.99% SLA Uptime
              </p>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-primary">Trusted Worldwide</p>
            </div>
          </div>
        </footer>
      </aside>

      <main className="xl:col-span-5 md:col-span-6 sm:col-span-8 col-span-4 flex items-center justify-center">
        {children}
      </main>
    </section>
  );
};

export default AuthLayout;
