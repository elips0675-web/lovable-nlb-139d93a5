
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const CoworkingTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Коворкинг"
      subtitle="Пространство для работы и творчества"
      description={`
        <p>Наш коворкинг — это удобное и современное пространство для работы, учёбы и реализации творческих проектов. Мы предлагаем комфортные рабочие места, высокоскоростной интернет и доступ ко всей необходимой инфраструктуре библиотеки.</p>
      `}
      price="От 400₽/день"
      features={[
        "Высокоскоростной Wi-Fi",
        "Комфортные рабочие места",
        "Доступ к принтеру и сканеру",
        "Зона отдыха с бесплатным чаем и кофе",
        "Переговорные комнаты",
      ]}
      image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3MTg0NDI0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
      color="from-purple-500 to-pink-500"
      bgColor="bg-purple-50"
    />
  );
};

export default CoworkingTemplate;
