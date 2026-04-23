import { motion } from 'motion/react';
import { BookOpen, Laptop, Headphones, FileText, Globe, Sparkles } from 'lucide-react';

const collections = [
  {
    icon: BookOpen,
    title: 'Классическая литература',
    count: '150,000+',
    description: 'Шедевры мировой и русской литературы',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Laptop,
    title: 'Электронные ресурсы',
    count: '200,000+',
    description: 'Цифровая библиотека и базы данных',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Headphones,
    title: 'Аудиокниги',
    count: '50,000+',
    description: 'Коллекция аудиокниг на разных языках',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: FileText,
    title: 'Научные издания',
    count: '75,000+',
    description: 'Журналы, диссертации и исследования',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Globe,
    title: 'Иностранные книги',
    count: '80,000+',
    description: 'Литература на 45 языках мира',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Sparkles,
    title: 'Редкие издания',
    count: '5,000+',
    description: 'Уникальные и антикварные книги',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-50',
  },
];

export function Collections() {
  return (
    <section id="коллекции" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm mb-4">
            Наши коллекции
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Исследуйте мир знаний
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            Более 500,000 изданий в различных форматах для вашего обучения и развития
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => {
            const Icon = collection.icon;
            return (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className={`${collection.bgColor} rounded-2xl p-8 h-full border border-gray-200 transition-all duration-300 group-hover:shadow-xl`}>
                  {/* Icon */}
                  <div className={`inline-flex p-4 bg-gradient-to-br ${collection.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {collection.title}
                  </h3>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                    {collection.count}
                  </div>
                  <p className="text-gray-600 mb-6">
                    {collection.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    Узнать больше
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transition-shadow">
            Посмотреть каталог полностью
          </button>
        </motion.div>
      </div>
    </section>
  );
}
