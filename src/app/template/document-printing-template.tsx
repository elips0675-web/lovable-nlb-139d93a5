
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const DocumentPrintingTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Печать документов"
      subtitle="Ч/Б и цветная печать документов"
      description="Распечатка, копирование и сканирование документов. Быстро и качественно."
      fullDescription="Предлагаем услуги по черно-белой и цветной печати документов формата А4 и А3. Вы можете распечатать курсовые, дипломные работы, рефераты, чертежи и любые другие документы. Также доступны услуги копирования и сканирования."
      price="От 5₽/страница"
      features={[
        "Ч/Б и цветная печать",
        "Форматы А4 и А3",
        "Копирование и сканирование",
        "Высокая скорость печати",
        "Печать с USB-носителей и электронной почты",
      ]}
      images={[
        'https://images.unsplash.com/photo-1517436025340-4b2c15102a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHByaW50aW5nfGVufDF8fHx8MTc3NTA1NzQ2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-sky-500 to-cyan-500"
      bgColor="bg-sky-50"
    />
  );
};

export default DocumentPrintingTemplate;
