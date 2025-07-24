interface AboutUs {
  title: string;
  
  description: string;
}
const About = () => {
  const aboutUs:AboutUs[]=[ {
    title: "Services",
  
    description: "BRAND STRATEGY, ADVERTISING, MOTION GRAPHIC & ANIMATION, CURATION & COLLABORATION, BRAND IDENTITY, EVENTS, FILMS, PRINT & OUTDOORS, CREATIVE CAMPAIGNS"
  }, {
    title: "Clients",
    description: "SOCH, SUPERDRY, RELIANCE TRENDS, HOUSE OF ESTE, AETHEL, PRITHAE"
  },{
    title: "About",
    description: "We are a creative studio specializing in high quality project execution. We blend fashion artistry with digital design precision, creating visually stunning and highly functional experiences. We believe in designs that speak, connect and illuminate, transforming your digital presence into a beacon of relatable, human centric interaction.A full service creative studio and home to storytellers and filmmakers."
  },];
  return (
    <div  className="min-h-screen bg-transparent" >
      <div className="w-full flex flex-row justify-end items-center">
        <div className="md:w-2/3">
        {aboutUs.map((item, index) => (
          <div key={index} className={`uppercase w-full flex flex-col md:flex-row p-5`}>
            <div className={`md:w-1/4  font-normal`}>{item.title}</div>
            <div className="md:w-3/4">{item.description}</div>
          </div>
        ))}
        </div>
      </div>
      
    </div>
  );
};

export default About;
