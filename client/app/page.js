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

export const metadata = {
  title: "Crowd-Funding",
  description: "Crowd Funding Platform Built On Web3",
  openGraph: {
    type: "website",
    url: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <BenefitsSection />
      <TeamSection />
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