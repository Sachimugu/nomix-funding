"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import SlideArrowButton from "./animata/button/slide-arrow-button";
import { BackgroundLines } from "./ui/background-line";
import ConnectButton from "./Connect-wallet";
import SponsorsSection from "./Sponsors";

export const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <BackgroundLines className="container w-full mx-auto">
      <div className="">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge className="">New</Badge>
            </span>
            <span> Lower transaction costs with Layer 2 integration on Arbitrum.</span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
            Fund Your Project with  
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Nomix
              </span>
              Web3
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`We're more than just a tool, we're a community of passionate
            creators. Get access to exclusive resources, tutorials, and support.`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">

            <SlideArrowButton className=""/>
           
            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold py-6 rounded-full"
            >
              <Link
                href="https://github.com/nobruf/shadcn-landing-page.git"
                target="_blank"
              >
                Github repository
              </Link>
            </Button>
          </div>
        </div>
        

      </div>
              <SponsorsSection />
              </div>
    </BackgroundLines>
  );
};

export default HeroSection;
