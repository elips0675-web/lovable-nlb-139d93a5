
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const LargeFormatPrintingTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Широкоформатная печать"
      subtitle="Печать плакатов, баннеров и чертежей"
      description="Печать на различных материалах: бумага, баннерная ткань, самоклеящаяся пленка. Высокое качество и точность цветопередачи."
      fullDescription="Предлагаем услуги широкоформатной печати для наружной и интерьерной рекламы. Печатаем плакаты, баннеры, чертежи, схемы и карты. Современное оборудование обеспечивает высокое разрешение и стойкость к внешним воздействиям."
      price="От 300₽/м²"
      features={[
        "Печать на бумаге, баннере, пленке",
        "Высокое разрешение (до 1440 dpi)",
        "Стойкие чернила (для улицы и помещений)",
        "Проклейка и установка люверсов",
        "Быстрое изготовление",
      ]}
      images={[
        'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3N0ZXJzJTIwcHJpbnRpbmclMjBwbGFjYXJkfGVufDF8fHx8MTc3NTA1NzIxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-blue-500 to-cyan-500"
      bgColor="bg-blue-50"
    />
  );
};

export default LargeFormatPrintingTemplate;
