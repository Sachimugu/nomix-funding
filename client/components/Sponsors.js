"use client";

import Marquee from "react-fast-marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";

const sponsors = [
  {
    image: "/images/1.png",
    name: "Acmebrand",
  },
  {
    image: "/images/2.png",
    name: "Acmelogo",
  },
  {
    image: "/images/3.png",
    name: "Acmesponsor",
  },
  {
    image: "/images/4.png",
    name: "Acmeipsum",
  },
  {
    image: "/images/5.png",
    name: "Acme",
  },
  {
    image: "/images/6.png",
    name: "Acme",
  },
  {
    image: "/images/7.png",
    name: "Acme",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Our Platinum Sponsors
      </h2>

      <div className="mx-auto">
        <Marquee>
          {sponsors.map(({ image, name }) => (
            <div
              key={name}
              className="flex items-center justify-center text-xl md:text-2xl font-medium bg-slate-800 p-4 rounded-lg mx-4"  // Added mx-4 for margin between elements
            >
              <div className="relative w-40 h-10 ">
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                // width={200}
                // height={10}
                  objectFit="scale-down"
                  className="rounded-md shadow-lg hover:scale-105 transition-all"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default SponsorsSection;
