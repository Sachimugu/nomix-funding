import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blocks, LineChart, Sparkle, Wallet2 } from "lucide-react";
// import { Icon } from "@/components/ui/icon";

const benefitList = [
  {
    icon: <Blocks size={32}
    color="hsl(var(--primary))"
    className="mb-6 text-primary"/>,
    title: "Build Brand Trust",
    description:
      "Showcase transparency, share project updates, and milestones to foster trust and credibility with your community and backers in the Web3 space.",
  },
  {
    icon: <LineChart size={32}
    color="hsl(var(--primary))"
    className="mb-6 text-primary"/>,
    title: "Refund Policy",
    description:
      "Offer a transparent, fair refund policy to ensure contributors feel secure and satisfied, even if the project doesn't meet its goals.",
  },
  {
    icon: <Wallet2 size={32}
    color="hsl(var(--primary))"
    className="mb-6 text-primary"/>,
    title: "Earn Airdrops",
    description:
      "Incentivize and reward contributors with airdrops, distributing exclusive tokens to engage your community and encourage participation in your fundraising efforts.",
  },
  {
    icon: <Sparkle size={32}
    color="hsl(var(--primary))"
    className="mb-6 text-primary"/>,
    title: "Test Marketing Ideas",
    description:
      "Optimize your fundraising strategies by testing marketing tactics, such as beta testing, referral programs, and influencer partnerships to boost project visibility.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32 mx-auto">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Shortcut to Success
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
          Unlock the full potential of your fundraising efforts with features designed to streamline your journey. From building trust to optimizing marketing strategies, our platform provides the tools you need to succeed in the Web3 space. Let us help you turn your vision into reality with ease and security
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">{icon}
                  {/* <Icon
                    name={icon}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  /> */}
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;