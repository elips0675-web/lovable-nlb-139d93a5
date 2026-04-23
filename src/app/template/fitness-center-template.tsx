
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const FitnessCenterTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Фитнес-центр"
      subtitle="Современный фитнес-центр с бассейном и спа-зоной"
      description={`
        <p>Фитнес-центр Библиотеки 2026 — это современное пространство для занятий спортом и поддержания здоровья. Здесь вы найдете тренажерный зал с новейшим оборудованием, бассейн с панорамными окнами, групповые занятия на любой вкус и спа-зону для релаксации после тренировок.</p>
      `}
      price="От 3000₽/месяц"
      features={[
        "Тренажерный зал",
        "Бассейн",
        "Групповые занятия",
        "Спа-зона",
        "Персональные тренировки",
      ]}
      image="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzE4NDQxNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
      color="from-green-500 to-teal-500"
      bgColor="bg-green-50"
    />
  );
};

export default FitnessCenterTemplate;
