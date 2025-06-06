
import { Variants } from "motion/react";
import * as motion from "motion/react-client"
const subHeading:string = "BUILDING BRIDGES BETWEEN BRANDS AND PEOPLE."
const childVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
const parentVariants: Variants = {
  initial: { backgroundPositionY: "50%" },
  visible: { backgroundPositionY: "0%" },
};
export default function Home() {

  return (
    <motion.div
      variants={parentVariants}
      style={{
         backgroundPositionX: "center", // Lock X so only Y moves
        backgroundPositionY: "50%", // fallback
      }}
      transition={{delay:0.2, duration: 0.5, ease: "easeInOut" }}
      className="h-screen w-full bg-[url('/bgGradient.png')] bg-no-repeat"
      initial="initial"
      whileHover="visible" 
    >
      <motion.div
        variants={childVariants}
        transition={{delay: 0.2, duration: 0.5, ease: "easeInOut" }}
        className="px-5 pt-6 h-1/2 w-full text-medium md:text-large lg:text-largest font-bold"
      >
        {subHeading}
      </motion.div>

      <div className="h-1/2 w-full" />
    </motion.div>
  );
}
