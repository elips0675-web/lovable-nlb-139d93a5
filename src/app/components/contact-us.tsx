
const ContactUs = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-400">We would love to hear from you. Drop us a line.</p>
        </div>
        <div className="max-w-lg mx-auto">
          <form>
            <div className="grid grid-cols-1 gap-6">
              <input type="text" placeholder="Your Name" className="bg-gray-800 text-white rounded-lg p-4" />
              <input type="email" placeholder="Your Email" className="bg-gray-800 text-white rounded-lg p-4" />
              <textarea placeholder="Your Message" className="bg-gray-800 text-white rounded-lg p-4" rows={5}></textarea>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-4 px-8">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
