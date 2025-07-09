// we have to integrate newletter logic here
import Link from "next/link";
import { CiInstagram, CiLinkedin } from "react-icons/ci";

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
  return (
    <div className="w-full md:w-1/3 gap-5 flex flex-col justify-start items-start ">
      <div className="w-full md:w-1/2 flex flex-col items-start m-5 gap-3.5">
        <span className="uppercase">{subscribe.title}</span>
        <input
          type="email"
          placeholder="Your email"
          className="border-b w-full"
        />
        <button className="uppercase text-secondary border border-secondary w-full">
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
