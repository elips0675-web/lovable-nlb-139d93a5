import { motion } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Eye, Droplet, Dumbbell, Wifi, Clock, Users, ArrowRight, Check, Calendar, MapPin, Phone, Mail, Star, Plus, Coffee, Gamepad2, Mic, Presentation, SearchX } from 'lucide-react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { servicesData } from '../data/service-details';

export default function ServiceDetailPage({ id: propId }: { id?: string }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const id = propId || paramId;

  const [currentService, setCurrentService] = useState(id ? servicesData[id] : null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });
  const [isAddPhotoOpen, setAddPhotoOpen] = useState(false);

  const service = currentService;

  const popularServices = [
    servicesData['observation-deck'],
    servicesData['coworking'],
    servicesData['gym'],
  ].filter(Boolean);

  const handleAddPhoto = () => {
    setAddPhotoOpen(true);
  };

  const handleConfirmAddPhoto = () => {
    if (!service) return;
    const newImage = `https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
    const updatedService = {
        ...service,
        images: [...service.images, newImage]
    };
    setCurrentService(updatedService);
    toast.success('Фотография успешно добавлена!');
    setAddPhotoOpen(false);
  };

  if (!service) {
    return (
        <div className="min-h-screen bg-white">
        <Header />
        <main className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg"
            >
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
                <SearchX className="w-12 h-12 text-red-500" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Услуга не найдена</h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                К сожалению, мы не смогли найти страницу, которую вы ищете. Возможно, она была перемещена, удалена или вы просто ошиблись в адресе.
              </p>
              <button
                onClick={() => navigate('/services')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transition-all font-semibold text-lg"
              >
                Вернуться ко всем услугам
              </button>
            </motion.div>

            {popularServices.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Возможно, вас заинтересует</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popularServices.map((popularService, index) => {
                            const Icon = popularService.icon;
                            return (
                                <motion.a
                                    key={popularService.id}
                                    href={`/services/${popularService.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-left block cursor-pointer"
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-br ${popularService.color} rounded-lg flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{popularService.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{popularService.description}</p>
                                    <div className="flex items-center text-blue-600 font-medium">
                                        <span>Узнать больше</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </motion.a>
                            )
                        })}
                    </div>
                </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
        toast.error('Пожалуйста, заполните все обязательные поля.');
        return;
    }
    if (!service) return;

    const storedServices = localStorage.getItem('bookedServices');
    const bookedServices = storedServices ? JSON.parse(storedServices) : [];

    const newBooking = {
        id: `${service.id}-${formData.date}-${formData.time}`,
        serviceId: service.id,
        title: service.title,
        image: service.images[0],
        color: service.color,
        date: formData.date,
        time: formData.time,
    };

    if (bookedServices.find((b: any) => b.id === newBooking.id)) {
        toast.info('Эта услуга на это время уже забронирована.');
        return;
    }

    bookedServices.push(newBooking);
    localStorage.setItem('bookedServices', JSON.stringify(bookedServices));

    toast.success('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/services')}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Назад к услугам</span>
          </motion.button>

          <div className="grid gap-12 items-start">
            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.color} rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {service.fullDescription}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Режим работы</h4>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700 text-center">
                    {service.schedule.map((item: any, index: number) => (
                      <div key={index}>
                        <span className="font-medium">{item.day}:</span> {item.time}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Контакты</h4>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700 text-center">
                    <div>{service.contacts.phone}</div>
                    <div>{service.contacts.email}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl font-bold text-gray-900 text-center"
                >
                    Галерея
                </motion.h2>
                <motion.button
                    onClick={handleAddPhoto}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                    <Plus className="w-5 h-5" />
                    <span>Добавить фото</span>
                </motion.button>
            </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {service.images.map((image: string, index: number) => (
                <div
                    key={index}
                    className="rounded-2xl overflow-hidden shadow-lg group"
                >
                    <ImageWithFallback
                    src={image}
                    alt={`${service.title} ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Что входит в услугу
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature: any, index: number) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <FeatureIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Цены и тарифы
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing.map((plan: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                  index === 1 ? 'ring-2 ring-purple-500 transform scale-105' : ''
                }`}
              >
                {index === 1 && (
                  <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full mb-4">
                    Популярный
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string, fIndex: number) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 bg-gradient-to-r ${service.color} text-white rounded-xl hover:shadow-lg transition-all font-medium`}>
                  Выбрать тариф
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12"
          >
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Забронировать
              </h2>
              <p className="text-lg text-gray-600">
                Заполните форму, и мы свяжемся с вами для подтверждения брони
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Дата *
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Время *
                  </label>
                  <input
                    type="time"
                    id="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Комментарий
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Дополнительная информация или пожелания..."
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 bg-gradient-to-r ${service.color} text-white rounded-xl hover:shadow-2xl transition-all text-lg font-semibold flex items-center justify-center gap-2`}
              >
                Отправить заявку
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-sm text-gray-500 text-center">
                * Обязательные поля. Мы свяжемся с вами в течение 1 часа для подтверждения брони.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />

      <Dialog open={isAddPhotoOpen} onOpenChange={setAddPhotoOpen}>
        <DialogContent className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Добавить новую фотографию</h3>
            <div className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-6">
                <p className="text-gray-500">Перетащите фото сюда или нажмите для выбора</p>
            </div>
            <div className="flex justify-end gap-4">
                <button
                    onClick={() => setAddPhotoOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Отмена
                </button>
                <button
                    onClick={handleConfirmAddPhoto}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Добавить
                </button>
            </div>
        </DialogContent>
    </Dialog>

    </div>
  );
}
