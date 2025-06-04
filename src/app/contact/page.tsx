interface ContactUs {
  title: string;
  description: string;
}
const Contact = () => {

  const ContactUs:ContactUs[]=[
    {
      title: "Office Address",
      description: "1234 Street Name, City, State, 12345"
    },
    {
      title: "General Email",
      description: "abcd@abcg.com"
    },
    {
      title: "Work Email",
      description: "work.abcd@abcg.com"
    },
    {
      title: "Colaberation Email",
      description: "colab.abcd@abcg.com"
    },
  ]
  return (
     <div className="min-h-screen">
      <div className='h-1/2 w-2/3 flex flex-row flex-wrap justify-center items-center'>
        {ContactUs.map((item, index) => (
          <div key={index} className='w-1/2 p-5 flex flex-row justify-start items-start gap-2 '>
            <div className='w-1/3 uppercase'>{item.title}</div>
            <div className=''>{item.description}</div>
          </div>
        ))}
      </div>
      <div className='h-1/2 w-full'></div>
    </div>
  )
}

export default Contact