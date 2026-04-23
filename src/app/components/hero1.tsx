
export function Hero1() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('https://demo.rivaxstudio.com/kayleen/wp-content/uploads/2024/04/h19-rev-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
          Каталог печатных услуг
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          От визиток до широкоформатных баннеров — всё, что нужно для вашего бизнеса и творчества. Качественно, быстро и с душой.
        </p>
      </div>
    </section>
  );
}
