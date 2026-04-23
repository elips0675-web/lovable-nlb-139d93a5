
const Testimonials = () => {
  const testimonials = [
    { name: 'John Doe', company: 'ABC Inc.', quote: 'The best agency I have ever worked with. They are creative, professional, and deliver results.' },
    { name: 'Jane Smith', company: 'XYZ Corp.', quote: 'I am so happy with my new website. It is beautiful, functional, and user-friendly.' },
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">Testimonials</h2>
          <p className="mt-4 text-lg text-gray-400">What our clients are saying about us.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg">
              <p className="text-lg text-gray-400 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="text-white font-bold">{testimonial.name}</div>
                <div className="text-gray-500 ml-2">- {testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
