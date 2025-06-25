interface AboutUs {
  title: string;
  openingLine: string;
  description: string;
}
const About = () => {
  const aboutUs:AboutUs[]=[{
    title: "About",
    openingLine: "We are a team of passionate individuals",
    description: "Our mission is to create innovative solutions that make a difference in the world."
  }, {
    title: "Services",
    openingLine: "We offer a range of services to help you succeed",
    description: "From web development to digital marketing, we have the expertise to help you achieve your goals."
  }, {
    title: "Clients",
    openingLine: "We have worked with a diverse range of clients",
    description: "Our clients range from startups to Fortune 500 companies, and we pride ourselves on delivering exceptional results."
  }]
  return (
    <div  className="min-h-screen bg-transparent" >
      <div className="px-5 md:hidden text-largest font-bold">ABOUT</div>
      <div className="w-full flex flex-row justify-end items-center">
        <div className="md:w-2/3">
        {aboutUs.map((item, index) => (
          <div key={index} className="w-full flex flex-col md:flex-row p-5">
            <div className="md:w-1/4 uppercase font-normal">{item.title}</div>
            <div className="md:w-3/4"><b>{item.openingLine}</b>{" "}{item.description}</div>
          </div>
        ))}
        </div>
      </div>
      <div className="h-1/2 w-full"></div>
    </div>
  );
};

export default About;
