
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const CanvasPrintingTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Печать на холсте"
      subtitle="Фотографии и репродукции картин на холсте"
      description="Перенесем ваши любимые фотографии или произведения искусства на натуральный холст. Отличный подарок и элемент декора."
      fullDescription="Мы используем только высококачественные натуральные холсты и пигментные чернила, которые обеспечивают яркость и долговечность изображения. Готовый холст натягивается на деревянный подрамник и покрывается защитным лаком."
      price="От 1200₽/м²"
      features={[
        "Натуральный хлопковый холст",
        "Пигментные чернила (гарантия 100 лет)",
        "Натяжка на деревянный подрамник",
        "Покрытие защитным лаком",
        "Различные размеры и форматы",
      ]}
      images={[
        'https://images.unsplash.com/photo-1617886944359-335f62c72b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMG9uJTIwY2FudmFzfGVufDF8fHx8MTc3NTA1NzI4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-amber-500 to-orange-500"
      bgColor="bg-amber-50"
    />
  );
};

export default CanvasPrintingTemplate;
