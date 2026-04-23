
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const ConferenceHallTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Конференц-зал"
      subtitle="Зал для проведения мероприятий любого формата"
      description={`
        <p>Наш конференц-зал — это идеальное место для проведения конференций, семинаров, тренингов и других мероприятий. Зал оснащен всем необходимым оборудованием: проектором, звуковой системой, микрофонами и флипчартом. Мы также предлагаем услуги по организации кофе-брейков и фуршетов.</p>
      `}
      price="От 5000₽/час"
      features={[
        "Современное оборудование",
        "Вместимость до 200 человек",
        "Различные варианты рассадки",
        "Организация кофе-брейков",
        "Техническая поддержка",
      ]}
      image="https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwaGFsbHxlbnwxfHx8fDE3MTg0NDI1NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      color="from-yellow-500 to-amber-500"
      bgColor="bg-yellow-50"
    />
  );
};

export default ConferenceHallTemplate;
