
import { ShieldCheck, Zap, Package } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    { icon: ShieldCheck, title: 'Высокое качество', description: 'Мы используем только лучшие материалы и современное оборудование для идеального результата.' },
    { icon: Zap, title: 'Быстрые сроки', description: 'Выполняем заказы в кратчайшие сроки без потери качества.' },
    { icon: Package, title: 'Любые тиражи', description: 'От одного экземпляра до крупных партий. Гибкий подход к каждому клиенту.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Каталог печатных услуг</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-indigo-100 p-4 rounded-full">
                     <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
