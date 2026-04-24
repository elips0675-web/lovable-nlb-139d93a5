import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { newsItems } from '../data/news';

export function News() {
  return (
    <section id="news" className="py-12 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Новости
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newsItems.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <Link to={`/news/${item.slug}`} className="block">
                <div className="relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm line-clamp-2">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
        >
            <Link to="/all-news">
                <button className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full hover:shadow-2xl transition-shadow text-lg font-semibold">
                    Все новости
                </button>
            </Link>
        </motion.div>

      </div>
    </section>
  );
}
