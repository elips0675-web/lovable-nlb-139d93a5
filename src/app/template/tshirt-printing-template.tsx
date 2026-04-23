
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const TshirtPrintingTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Печать на футболках"
      subtitle="Одежда с вашим уникальным дизайном"
      description="Нанесем на футболку любой принт: от логотипа компании до вашей любимой фотографии."
      fullDescription="Мы предлагаем несколько методов печати на текстиле, включая термотрансферную печать и прямую цифровую печать (DTG), что позволяет создавать качественные и износостойкие изображения. Используем футболки из 100% хлопка. Отличный способ выделиться или создать униформу для команды."
      price="От 800₽/шт."
      features={[
        "Прямая цифровая печать (DTG)",
        "Термотрансферная печать",
        "Футболки из 100% хлопка (разные цвета)",
        "Печать от 1 штуки",
        "Стойкость к стиркам",
      ]}
      images={[
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBwcmludGluZ3xlbnwxfHx8fDE3NzUzMDMwODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-indigo-500 to-purple-500"
      bgColor="bg-indigo-50"
    />
  );
};

export default TshirtPrintingTemplate;
