import { Variants } from "motion/react";
import * as motion from "motion/react-client";

const heading: string[][] = [
  ["AS A DIVERSE", "BOUTIQUE CREATIVE STUDIO", "WITH A DIVERSE TEAM,"],
  ["PLENCY PROVIDES EVERYTHING"],
];

const subHeading: string[][] = [
  ["FROM FIRST", "CONCEPTS", "TO FINAL", "PRODUCTION"],
  ["UNDER ONE", "SINGLE ROOF."],
];
const childVariants: Variants = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
};
const parentVariants: Variants = {
  initial: { backgroundPositionY: "50%" },
  visible: { backgroundPositionY: "0%" },
};
export default function Home() {
  // const subHeadingArray: string[] = subHeading.split(" ");
  return (
    <>
      <motion.div
        variants={parentVariants}
        // style={{
        //   backgroundPositionX: "center", // Lock X so only Y moves
        //   backgroundPositionY: "50%", // fallback
        // }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
        className="h-screen w-full bg-no-repeat flex flex-col justify-between"
        initial="initial"
        whileHover="visible"
      >
        <div className="flex flex-col gap-4 px-4 pt-6 w-full">
          {/* {subHeadingArray.map((word, index) => (
          <span key={index} className="overflow-hidden inline-block">
            <motion.span
              variants={childVariants}
              transition={{
                delay: 0.2,
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="hidden md:inline-block text-medium md:text-large lg:text-largest font-bold"
            >
              {word}&nbsp;
            </motion.span>
            <span
              className="md:hidden inline-block text-medium md:text-large lg:text-largest font-bold"
            >
              {word}&nbsp;
            </span>
          </span>
        ))} */}
          <motion.h1
            variants={childVariants}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
            className="hidden md:flex"
          >
            {heading.map((arr, index) => (
              <span key={index} className="block font-normal">
                {arr.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`inline-block ${
                      wordIndex % 2 === 0 ? "" : "text-black"
                    }`}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>
          <motion.h2
            variants={childVariants}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
            className="hidden md:flex"
          >
            {subHeading.map((arr, index) => (
              <span key={index} className="block font-normal">
                {arr.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`inline-block ${
                      wordIndex % 2 === 0 ? "" : "text-black"
                    }`}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </span>
            ))}
          </motion.h2>
          <h1 className="md:hidden">
            {heading.map((arr, index) => (
              <span key={index} className="block font-normal">
                {arr.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`inline-block ${
                      wordIndex % 2 === 0 ? "" : "text-black"
                    }`}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <h2 className="md:hidden">
            {subHeading.map((arr, index) => (
              <span key={index} className="block font-normal">
                {arr.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`inline-block ${
                      wordIndex % 2 === 0 ? "" : "text-black"
                    }`}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
        <div className="w-full h-1/2 flex flex-col justify-center items-center">
          <video
            className="hidden md:block"
            src="https://cdn.plency.com/1080p/Laptopvideo.mp4"
            muted
            loop
            autoPlay
            preload="auto"
          ></video>
          <video
            className="md:hidden block"
            src="https://cdn.plency.com/720p/PhoneLeftToRignt.mp4"
            muted
            loop
            autoPlay
            preload="auto"
          ></video>
          <video
            className="md:hidden block"
            src="https://cdn.plency.com/plency-bucket/720p/PhoneRightToLeft.mp4"
            muted
            loop
            autoPlay
            preload="auto"
          ></video>
        </div>
      </motion.div>
    </>
  );
}
