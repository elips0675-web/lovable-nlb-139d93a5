import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getNewsBySlug, newsItems } from '../data/news';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = id ? getNewsBySlug(id) : undefined;

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Новость не найдена</h1>
          <p className="text-gray-600 mb-8">Возможно, она была удалена или ссылка устарела.</p>
          <Link
            to="/all-news"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Ко всем новостям
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: item.description, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Ссылка скопирована');
    }
  };

  const related = newsItems
    .filter((n) => n.category === item.category && n.id !== item.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] sm:h-[520px] overflow-hidden">
        <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-full text-sm font-medium transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
          <div className={`inline-block self-start px-4 py-2 bg-gradient-to-r ${item.color} text-white rounded-full text-sm font-medium shadow-lg mb-4`}>
            {item.category}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-bold text-white max-w-3xl"
          >
            {item.title}
          </motion.h1>
          <p className="mt-4 text-white/90 text-lg max-w-2xl">{item.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>{item.date}</span>
              </div>
              {item.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{item.readTime}</span>
                </div>
              )}
              {item.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>{item.author}</span>
                </div>
              )}
              <button
                onClick={handleShare}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 rounded-full transition-all"
              >
                <Share2 className="w-4 h-4" />
                Поделиться
              </button>
            </div>

            <div className="space-y-5 text-gray-800 leading-relaxed text-lg">
              {(item.fullContent ?? [item.description]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sticky info card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Об этой новости</h3>
              <div className="text-sm text-gray-600 space-y-3">
                <div className="flex justify-between">
                  <span>Категория</span>
                  <span className="font-medium text-gray-900">{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Дата</span>
                  <span className="font-medium text-gray-900">{item.date}</span>
                </div>
                {item.readTime && (
                  <div className="flex justify-between">
                    <span>Чтение</span>
                    <span className="font-medium text-gray-900">{item.readTime}</span>
                  </div>
                )}
              </div>
              <Link
                to="/all-news"
                className="block w-full py-3 text-center bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Все новости
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Похожие новости</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/news/${r.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-sm text-gray-500 mb-1">{r.date}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
