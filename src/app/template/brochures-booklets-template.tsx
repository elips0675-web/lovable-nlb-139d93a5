
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const BrochuresBookletsTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Брошюры и буклеты"
      subtitle="Печать рекламных материалов и каталогов"
      description="Яркие и информативные брошюры для вашего бизнеса. Любые тиражи и способы скрепления."
      fullDescription="Изготавливаем рекламные брошюры, каталоги продукции, меню для ресторанов. Возможна сшивка на скобу, пружину или термоклей. Разработка дизайна и верстка."
      price="От 500₽/тираж"
      features={[
        "Различные форматы и типы бумаги",
        "Сшивка на скобу, пружину, термоклей",
        "Разработка дизайна и верстка",
        "Ламинация и УФ-лакирование",
        "Срочная печать",
      ]}
      images={[
        'https://images.unsplash.com/photo-1612351217829-9e467539406f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9jaHVyZXMlMjBmbHllcnMlMjBjYXRhbG9nfGVufDF8fHx8MTc3NTA1NzE0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-green-500 to-emerald-500"
      bgColor="bg-green-50"
    />
  );
};

export default BrochuresBookletsTemplate;
