
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const ObservationDeckTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Обзорная площадка"
      subtitle="Вид на город с высоты птичьего полёта"
      description={`
        <p>Обзорная площадка Библиотеки 2026 — это не просто смотровая площадка, а настоящее пространство для вдохновения и отдыха. Панорамное остекление позволяет наслаждаться видами города в любую погоду. На территории площадки расположено уютное кафе с террасой, где можно выпить кофе или чай, наслаждаясь захватывающими видами.</p>
      `}
      price="От 250₽/час"
      features={[
        "Панорамный вид на город",
        "Уютное кафе с террасой",
        "Телескопы для наблюдения за звёздами",
        "Бесплатный Wi-Fi",
        "Проведение фотосессий",
      ]}
      image="https://images.unsplash.com/photo-1588622529193-7642efa75294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaGlvJTIwcGFyaWJ1fGVufDF8fHx8MTcxODQ0MTU0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
      color="from-blue-500 to-indigo-500"
      bgColor="bg-blue-50"
    />
  );
};

export default ObservationDeckTemplate;
