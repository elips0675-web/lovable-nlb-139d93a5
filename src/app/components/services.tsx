import { motion } from 'motion/react';
import { Wifi, Coffee, Monitor, Users, Printer, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Wifi, title: 'Бесплатный Wi-Fi', description: 'Высокоскоростной интернет во всех зонах' },
  { icon: Coffee, title: 'Кафе и зоны отдыха', description: 'Комфортные пространства для работы' },
  { icon: Monitor, title: 'Компьютерные залы', description: 'Современное оборудование для работы' },
  { icon: Users, title: 'Залы для мероприятий', description: 'Конференц-залы и аудитории' },
  { icon: Printer, title: 'Печать и сканирование', description: 'Копировальные услуги' },
  { icon: Clock, title: 'Гибкий график', description: 'Работаем с 8:00 до 22:00' },
];

export function Services() {
  return (
    <section id="услуги" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm mb-4 shadow-sm">
            Наши услуги
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Комфорт и технологии для вашего обучения
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Мы создали современное пространство, где каждый найдёт идеальные условия 
            для работы, учёбы и творчества
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-50/50 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center mb-5 mx-auto">
                  <Icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        {/* CTA Button */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
        >
            <Link to="/services">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full hover:shadow-xl transition-shadow text-lg font-semibold">
                Все услуги
            </button>
            </Link>
        </motion.div>

      </div>
    </section>
  );
}
