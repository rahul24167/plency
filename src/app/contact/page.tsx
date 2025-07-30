import Subscribe from "../components/subscribe";
interface ContactUs {
  title: string;
  description: string;
}

const Contact = () => {
  const contactUs: ContactUs[] = [
    {
      title: "Address",
      description:
        "New Delhi, India",
    },
    {
      title: "Email",
      description: "hi@plency.com",
    },
  ];
  return (
    <div className="min-h-screen bg-transparent">
      <div className="w-full flex flex-col-reverse md:flex-row justify-start items-start">
        <Subscribe />
        <div className="md:w-1/3">
          {contactUs.map((item, index) => (
            <div
              key={index}
              className={` w-full flex flex-col md:flex-row p-5`}
            >
              <div className={`md:w-1/4 uppercase font-normal`}>
                {item.title}
              </div>
              <div className="md:w-3/4 font-normal">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
