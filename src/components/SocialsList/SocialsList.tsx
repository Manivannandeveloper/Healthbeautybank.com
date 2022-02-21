import { SocialType } from "components/SocialsShare/SocialsShare";
import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { id: "Facebook", name: "Facebook", icon: "lab la-facebook-f", href: "https://www.facebook.com/HealthBeautyBank", class: "facebook" },
  { id: "Twitter", name: "Twitter", icon: "lab la-twitter", href: "https://twitter.com/healthbeautyban", class:"twitter"},
  { id: "Instagram", name: "Instagram", icon: "lab la-instagram", href: "https://www.instagram.com/healthbeautybank", class: "instagram" },
  { id: "Linkedin", name: "Linkedin", icon: "lab la-linkedin-in", href: "https://www.linkedin.com/healthbeautybank", class:"linkedin"},
];

export const SOCIALS_2 = socialsDemo;

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <i className={item.icon}></i>
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
