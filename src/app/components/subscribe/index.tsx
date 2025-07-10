"use client";
import Link from "next/link";
import { useState } from "react";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { subscribeToNewsletter } from "../../actions/newsletter";

interface SocialLink {
  name: string;
  logo?: React.ReactNode;
  url: string;
}
interface Subscribe {
  title: string;
  socialLinks: SocialLink[];
}
const Subscribe = () => {
  const [email, setEmail] = useState("");
  const subscribe: Subscribe = {
    title: "SUBSCRIBE TO OUR NEWSLETTER AND STAY UPDATED.",
    socialLinks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/plency/",
        logo: <CiLinkedin className="text-secondary font-bold w-6 h-6" />
         
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/plency.co/",
        logo: <CiInstagram className="text-secondary font-bold w-6 h-6" />,
      },
    ],
  };
  const handleSubscribe =  () => {
    if(!email) {
      alert("Please enter a valid email address.");
      return;
    }
    subscribeToNewsletter(email)
      .then((response) => {
        if(!response) {
          throw new Error("Subscription failed");
        }
        alert("Thank you for subscribing!");
        setEmail("");
      })
      .catch((error) => {
        console.error("Subscription failed:", error);
        alert("Subscription failed. Please try again later.");
      });
  };
  return (
    <div className="w-full md:w-1/3 gap-5 flex flex-col justify-start items-start ">
      <div className="w-full md:w-1/2 flex flex-col items-start m-5 gap-3.5">
        <span className="uppercase">{subscribe.title}</span>
        <input
          type="email"
          placeholder="Your email"
          className="border-b w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="uppercase text-secondary border border-secondary w-full" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
      <div className="relative w-1/2 mx-5  px-2 flex flex-row justify-start items-center gap-2 ">
        {subscribe.socialLinks.map((link, index) => (
          <Link key={index} href={link.url} target="_blank">
            {link.logo}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
