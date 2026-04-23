
const AboutUs = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/h19-about-us-img.jpg" alt="About Us" className="rounded-lg" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4">About Us</h2>
            <p className="text-lg text-gray-400 mb-6">We are a team of creative professionals who are passionate about helping businesses grow. We have a proven track record of delivering exceptional results for our clients.</p>
            <a href="#" className="text-blue-500 hover:underline">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
