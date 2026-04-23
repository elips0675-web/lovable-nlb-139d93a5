
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const BusinessCardsTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Визитки"
      subtitle="Изготовление визитных карточек"
      description="Печать визиток на любой вкус: от классических до эксклюзивных. Большой выбор дизайнерской бумаги."
      fullDescription="Предлагаем цифровую и офсетную печать визиток. У нас вы можете заказать как простые односторонние, так и двусторонние визитки с ламинацией, скруглением углов, тиснением и другими видами отделки. Поможем с разработкой макета."
      price="От 400₽/100шт."
      features={[
        "Цифровая и офсетная печать",
        "Большой выбор дизайнерской бумаги",
        "Ламинация, скругление углов, тиснение",
        "Разработка макета",
        "Срочное изготовление",
      ]}
      images={[
        'https://images.unsplash.com/photo-1559135182-a7d59a936bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmRzfGVufDF8fHx8MTc3NTA1NzM4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-slate-500 to-gray-500"
      bgColor="bg-slate-50"
    />
  );
};

export default BusinessCardsTemplate;
