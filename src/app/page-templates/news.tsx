import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    id: 1,
    title: 'Летний читальный зал открыт!',
    date: '15 июня 2024',
    description: 'Наслаждайтесь книгами на свежем воздухе в нашем уютном летнем дворике.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3VtbWVyfGVufDF8fHx8MTc3NTE2NjYyNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Новые поступления: научная фантастика',
    date: '12 июня 2024',
    description: 'Более 50 новых книг в жанре научной фантастики уже на полках.',
    image: 'https://images.unsplash.com/photo-1583463699313-290071c67f56?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Онлайн-встреча с писателем-фантастом',
    date: '10 июня 2024',
    description: 'Обсуждение новой книги и творческих планов с известным автором.',
    image: 'https://images.unsplash.com/photo-1516131206008-dd2c85b3b1dd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'Выставка «История книгопечатания»',
    date: '8 июня 2024',
    description: 'Узнайте о развитии технологий печати от Гутенберга до наших дней.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNjc0MDIwMzY4fDA&ixlib=rb-1.2.1&q=80&w=1080',
  },
  {
    id: 5,
    title: 'Клуб любителей классики: обсуждаем «Войну и мир»',
    date: '5 июня 2024',
    description: 'Присоединяйтесь к нашему ежемесячному клубу для глубокого погружения в шедевры мировой литературы.',
    image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    title: 'Детский час: читаем сказки',
    date: '2 июня 2024',
    description: 'Каждое воскресенье мы читаем вслух лучшие сказки для самых маленьких слушателей.',
    image: 'https://images.unsplash.com/photo-1501724398958-b1c1c1a96c23?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

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
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
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
