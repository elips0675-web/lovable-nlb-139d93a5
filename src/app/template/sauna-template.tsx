
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const SaunaTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Сауна"
      subtitle="Финская сауна и хаммам для полного расслабления"
      description={`
        <p>Сауна Библиотеки 2026 — это оазис спокойствия и релаксации. К вашим услугам финская сауна, турецкий хаммам, купель с холодной водой и уютная комната отдыха. Идеальное место, чтобы отдохнуть душой и телом, восстановить силы и зарядиться энергией.</p>
      `}
      price="От 1500₽/час"
      features={[
        "Финская сауна",
        "Турецкий хаммам",
        "Купель с холодной водой",
        "Комната отдыха",
        "Ароматерапия",
      ]}
      image="https://images.unsplash.com/photo-1603561498338-08b5f385c290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVuYSUyMGludGVyaW9yfGVufDF8fHx8MTcxODQ0MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
      color="from-red-500 to-orange-500"
      bgColor="bg-red-50"
    />
  );
};

export default SaunaTemplate;
