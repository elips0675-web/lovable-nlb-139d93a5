
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const BindingBookbindingTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Переплёт и брошюровка"
      subtitle="Скрепление документов и дипломных работ"
      description="Профессиональный переплет на пластиковую или металлическую пружину, твердый переплет для дипломных работ."
      fullDescription="Оказываем услуги по скреплению документов: брошюровка на пластиковую и металлическую пружину, твердый книжный переплет для дипломов и диссертаций. Аккуратный внешний вид и надежное скрепление ваших документов."
      price="От 150₽/шт."
      features={[
        "Переплет на пластиковую пружину",
        "Переплет на металлическую пружину",
        "Твердый книжный переплет (для дипломов)",
        "Большой выбор обложек",
        "Быстрое исполнение",
      ]}
      images={[
        'https://images.unsplash.com/photo-1629904850797-e5d3c88e5d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwYmluZGluZ3xlbnwxfHx8fDE3NzUwNTc1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-rose-500 to-pink-500"
      bgColor="bg-rose-50"
    />
  );
};

export default BindingBookbindingTemplate;
