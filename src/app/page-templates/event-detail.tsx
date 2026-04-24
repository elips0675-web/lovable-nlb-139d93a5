import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, User } from 'lucide-react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getEventById, events, type EventItem } from '../data/events';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Мероприятие не найдено</h1>
          <p className="text-gray-600 mb-8">Возможно, оно было удалено или ссылка устарела.</p>
          <Link
            to="/all-events"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Ко всем мероприятиям
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSignUp = () => {
    const stored = localStorage.getItem('signedUpEvents');
    const list: EventItem[] = stored ? JSON.parse(stored) : [];
    if (list.find((e) => e.id === event.id)) {
      toast.info('Вы уже записаны на это мероприятие');
      return;
    }
    list.push(event);
    localStorage.setItem('signedUpEvents', JSON.stringify(list));
    toast.success('Вы успешно записались на мероприятие!');
  };

  const related = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] sm:h-[520px] overflow-hidden">
        <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-full text-sm font-medium transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
          <div className={`inline-block self-start px-4 py-2 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-medium shadow-lg mb-4`}>
            {event.category}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-bold text-white max-w-3xl"
          >
            {event.title}
          </motion.h1>
          <p className="mt-4 text-white/90 text-lg max-w-2xl">{event.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">О мероприятии</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {event.fullDescription || event.description}
              </p>
            </div>

            {event.program && event.program.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Программа</h2>
                <div className="space-y-3">
                  {event.program.map((p, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="font-bold text-blue-600 min-w-[60px]">{p.time}</div>
                      <div className="text-gray-800">{p.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.speaker && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Спикер</h2>
                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <User className="w-7 h-7" />
                  </div>
                  <div className="text-gray-900 font-medium">{event.speaker}</div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky info card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{event.attendees} участников</span>
              </div>
              <button
                onClick={handleSignUp}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Зарегистрироваться
              </button>
              <p className="text-xs text-gray-500 text-center">
                Регистрация бесплатная. Подтверждение придёт в личный кабинет.
              </p>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Похожие мероприятия</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/all-events/${r.id}`}
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
                    <div className="text-sm text-gray-500 mb-1">{r.date} · {r.time}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
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