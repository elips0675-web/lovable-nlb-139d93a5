
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
      
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Каталог печатных услуг
            </h1>
            <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto">
              От визиток до широкоформатных баннеров — всё, что нужно для вашего бизнеса и творчества. Качественно, быстро и с душой.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PushNotificationBanner />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                    <div className="relative h-44 sm:h-56 overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${service.color} rounded-xl shadow-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                    
                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">{service.description}</p>
                      <Link to={`/printing-services/${service.id}`} className={`mt-4 inline-block py-3 px-4 sm:px-6 bg-gradient-to-r ${service.color} text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2 group text-sm sm:text-base`}>
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