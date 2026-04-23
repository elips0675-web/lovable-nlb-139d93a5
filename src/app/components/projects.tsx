
const Projects = () => {
  const projects = [
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/p-h19-1.jpg', alt: 'Project 1' },
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/p-h19-2.jpg', alt: 'Project 2' },
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/p-h19-3.jpg', alt: 'Project 3' },
    { src: 'https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/p-h19-4.jpg', alt: 'Project 4' },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">Our Projects</h2>
          <p className="mt-4 text-lg text-gray-400">Check out some of our recent work.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <img src={project.src} alt={project.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
