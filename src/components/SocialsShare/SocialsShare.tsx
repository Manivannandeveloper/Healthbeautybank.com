import React, { FC } from "react";

export interface SocialsShareProps {
  className?: string;
  itemClass?: string;
}

export interface SocialType {
  id: string;
  name: string;
  icon: string;
  href: string;
  class: string;
}

const socials: SocialType[] = [
  { id: "Facebook", name: "Facebook", icon: "lab la-facebook-f", href: "https://www.facebook.com/HealthBeautyBank", class: "facebook" },
  { id: "Twitter", name: "Twitter", icon: "lab la-twitter", href: "https://twitter.com/healthbeautyban", class:"twitter"},
  { id: "Instagram", name: "Instagram", icon: "lab la-instagram", href: "https://www.instagram.com/healthbeautybank", class: "instagram" },
  { id: "Linkedin", name: "Linkedin", icon: "lab la-linkedin-in", href: "https://www.linkedin.com/healthbeautybank", class:"linkedin"},
  
];

export const SOCIALS_DATA = socials;

const SocialsShare: FC<SocialsShareProps> = ({
  className = "grid",
  itemClass = "w-7 h-7 text-base hover:bg-neutral-100",
}) => {
  const renderItem = (item: SocialType, index: number) => {
    return (               
      <a
        key={index}
        href={item.href}
        // className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 ${itemClass}`}
        className={item.class}
        title={`Share on ${item.name}`}
        target="_blank"
      >
        <i className={item.icon}></i>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsShare ${className}`} data-nc-id="SocialsShare">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsShare;
