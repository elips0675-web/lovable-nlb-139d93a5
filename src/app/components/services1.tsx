
import { Printer, FileText, CreditCard, BookOpen } from 'lucide-react';

const Services1 = () => {
  const catalogServices = [
    {
      id: 'paper-printing',
      icon: Printer,
      title: 'Печать документов',
      description: 'Чёрно-белая и цветная печать любых форматов. Идеально для рефератов, отчетов и курсовых.',
    },
    {
      id: 'business-cards',
      icon: CreditCard,
      title: 'Визитки',
      description: 'Профессиональная печать визиток на различных материалах. Создайте первое впечатление.',
    },
    {
      id: 'brochures',
      icon: FileText,
      title: 'Брошюры и буклеты',
      description: 'Рекламные материалы, каталоги и меню. Любые тиражи и виды скрепления.',
    },
    {
      id: 'bookbinding',
      icon: BookOpen,
      title: 'Переплёт и брошюровка',
      description: 'Твёрдый и мягкий переплёт для дипломных работ, отчетов и презентаций.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Каталог печатных услуг</h2>
          <p className="mt-4 text-lg text-gray-500">От визиток до широкоформатных баннеров — всё, что нужно для вашего бизнеса и творчества.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {catalogServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-gray-50 p-8 rounded-lg flex items-start">
                <div className="flex-shrink-0">
                  <Icon className="w-8 h-8 text-indigo-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services1;
