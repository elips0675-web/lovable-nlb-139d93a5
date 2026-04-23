
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PushNotificationBanner } from '../components/PushNotificationBanner';
import { ArrowRight } from 'lucide-react';
import { catalogServices } from '../data/printing-services';

export default function PrintingServicesCatalog() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Каталог печатных услуг
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              От визиток до широкоформатных баннеров — всё, что нужно для вашего бизнеса и творчества. Качественно, быстро и с душой.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PushNotificationBanner />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl shadow-lg flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                      <Link to={`/printing-services/${service.id}`} className={`mt-4 inline-block py-3 px-6 bg-gradient-to-r ${service.color} text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2 group`}>
                        Подробнее
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}