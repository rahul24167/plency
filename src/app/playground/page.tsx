import * as motion from "motion/react-client"
const Playground = () => {
  const items = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className="mx-6">
      COMING SOON
    </span>
  ));
  return (
    

    <div className="h-1/2 w-full flex flex-col flex-wrap justify-end">
     <div className="relative overflow-hidden h-[10vh] bg-primary text-tertiary flex items-center">
      <motion.div
        className="absolute whitespace-nowrap text-xl font-bold"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items}
        {items}
      </motion.div>
    </div>
    </div> 
  )
}

export default Playground