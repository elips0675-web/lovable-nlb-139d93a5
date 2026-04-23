
const Partners = () => {
  const logos = [
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/c-logo-1w.png', alt: 'Partner 1' },
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/c-logo-2w.png', alt: 'Partner 2' },
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/c-logo-3w.png', alt: 'Partner 3' },
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/c-logo-4w.png', alt: 'Partner 4' },
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/c-logo-5w.png', alt: 'Partner 5' },
  ];

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8">
          Trusted by
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {logos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className="h-12" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
