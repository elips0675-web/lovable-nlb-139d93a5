import React, { useCallback } from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { catalogServices } from '../data/printing-services';
import { ImageWithFallback } from './figma/ImageWithFallback';

const ServicesSlider: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-10">
            Каталог печатных услуг
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {catalogServices.map((service, index) => {
                const Icon = service.icon;
                return(
                <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={service.id}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${service.color} rounded-xl shadow-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>

                    {/* Content & Pricing */}
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {service.description}
                      </p>
                      <div className="space-y-2 sm:space-y-3 flex-grow mt-2">
                        {service.prices.map((item) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{item.name}</span>
                            <span className={`font-bold text-base bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Button */}
                      <Link to={`/printing-services/${service.id}`} className={`mt-6 w-full py-3 bg-gradient-to-r ${service.color} text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 group`}>
                        Подробнее
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          <button 
            onClick={scrollPrev} 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 ml-2 -mt-16"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button 
            onClick={scrollNext} 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 mr-2 -mt-16"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        {/* CTA Button */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
        >
            <Link to="/printing-services">
            <button className="px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-2xl transition-shadow text-lg font-semibold">
                Перейти в каталог
            </button>
            </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSlider;
