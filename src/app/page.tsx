import { Variants } from "motion/react";
import * as motion from "motion/react-client";

const subHeading: string = "BUILDING BRIDGES BETWEEN BRANDS AND PEOPLE.";
const childVariants: Variants = {
  initial: { y: "100%" },
  visible: { y: "0%" },
};
const parentVariants: Variants = {
  initial: { backgroundPositionY: "50%" },
  visible: { backgroundPositionY: "0%" },
};
export default function Home() {
  const subHeadingArray: string[] = subHeading.split(" ");
  return (
    <motion.div
      variants={parentVariants}
      // style={{
      //   backgroundPositionX: "center", // Lock X so only Y moves
      //   backgroundPositionY: "50%", // fallback
      // }}
      transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
      className="h-screen w-full bg-no-repeat"
      initial="initial"
      whileHover="visible"
    >
      <div className="flex flex-wrap px-4 pt-6 w-full">
        {subHeadingArray.map((word, index) => (
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
        ))}
      </div>

    </motion.div>
  );
}
