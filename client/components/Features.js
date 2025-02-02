import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Icon } from "@/components/ui/icon";
import { BadgeCheck, Goal, icons, MousePointerClick, Newspaper, PictureInPicture, Smartphone } from "lucide-react";

const featureList = [
  {
    icon: <Smartphone  size={24}
    color="hsl(var(--primary))"
    className="text-primary"></Smartphone>,
    title: "Mobile Accessibility",
    description:
      "Easily contribute to fundraising campaigns from any device. Our Web3 app is designed to be fully responsive, providing access on the go.",
  },
  {
    icon: <BadgeCheck  size={24}
    color="hsl(var(--primary))"
    className="text-primary"></BadgeCheck>,
    title: "Verified Projects",
    description:
      "All campaigns are verified using blockchain technology to ensure transparency and trust. Investors can feel confident knowing they’re supporting legitimate causes.",
  },
  {
    icon: <Goal  size={24}
    color="hsl(var(--primary))"
    className="text-primary"></Goal>,
    title: "Decentralized Funding",
    description: "Harness the power of blockchain to raise funds in a decentralized manner. No middleman, just direct contributions between backers and creators.",
  },
  
  {
    icon: <PictureInPicture  size={24}
    color="hsl(var(--primary))"
    className="text-primary"></PictureInPicture>,
    title: "Engaging Campaigns",
    description:
      "Showcase your crowdfunding project with visually rich content. With support for multimedia and interactive features, make your campaign stand out.",
  },
  {
    icon: <MousePointerClick  size={24}
    color="hsl(var(--primary))"
    className="text-primary"/>,
    title: "Easy Contributions",
    description:
      "Contribute to your favorite projects with just a few clicks. Our Web3 app supports simple, fast transactions using cryptocurrency and digital wallets.",
  },
  {
    icon: <Newspaper  size={24}
    color="hsl(var(--primary))"
    className="text-primary"/>,
    title: "Transparent Fund Tracking",
    description:
      "Track the progress of each campaign with real-time data, all recorded on the blockchain for full transparency. Know exactly where your funds are going.",
  },
];


export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 mx-auto">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Us Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
        fugiat, odit similique quasi sint reiciendis quidem iure veritatis optio
        facere tenetur.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                {icon}
                  {/* <Icon
                    name={icon}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  /> */}
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};


export default FeaturesSection;