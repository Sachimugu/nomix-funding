'use client'
// import { BenefitsSection } from "@/components/layout/sections/benefits";
// import { CommunitySection } from "@/components/layout/sections/community";
// import { ContactSection } from "@/components/layout/sections/contact";
// import { FAQSection } from "@/components/layout/sections/faq";
// import { FeaturesSection } from "@/components/layout/sections/features";
// import { FooterSection } from "@/components/layout/sections/footer";
// import { PricingSection } from "@/components/layout/sections/pricing";
// import { ServicesSection } from "@/components/layout/sections/services";
// import { SponsorsSection } from "@/components/layout/sections/sponsors";
// import { TeamSection } from "@/components/layout/sections/team";
// import { TestimonialSection } from "@/components/layout/sections/testimonial";

import BenefitsSection from "@/components/Benefit-section";
import { CommunitySection } from "@/components/Community";
import FeaturesSection from "@/components/Features";
import { FooterSection } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SponsorsSection from "@/components/Sponsors";
import { TeamSection } from "@/components/Teams";



export default function Home() {


  
  
  return (
    <div className="">
      <HeroSection />
      {/* <BenefitsSection /> */}
    
      
      <TeamSection />
      <div className=" md:hidden ">
      
              <SponsorsSection />
              </div>
      <FeaturesSection />
      <CommunitySection />
      <FooterSection /> 
      {/* 
      
      <ServicesSection />
      <TestimonialSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      */}
    </div>
  );
}