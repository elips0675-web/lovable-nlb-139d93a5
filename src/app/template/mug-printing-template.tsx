
import { ServiceDetail } from "@/components/service-detail";
import { FC } from "react";

const MugPrintingTemplate: FC = () => {
  return (
    <ServiceDetail
      title="Печать на кружках"
      subtitle="Уникальный подарок или корпоративный сувенир"
      description="Создайте уникальную кружку с вашим собственным дизайном: фото, логотип или надпись."
      fullDescription="Мы печатаем изображения на керамических кружках методом сублимации, что гарантирует яркость, стойкость и долговечность принта. Это отличный вариант для персонального подарка или для создания корпоративной атрибутики. Вы можете выбрать белую кружку или кружку с цветной внутренней поверхностью и ручкой."
      price="От 450₽/шт."
      features={[
        "Сублимационная печать",
        "Яркие и стойкие цвета",
        "Керамические кружки (белые, цветные)",
        "Печать от 1 штуки",
        "Помощь в разработке макета",
      ]}
      images={[
        'https://images.unsplash.com/photo-1516788419857-a41a4c921102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBtdWclMjBwcmludGluZ3xlbnwxfHx8fDE3NzUzMDMwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ]}
      color="from-red-500 to-amber-500"
      bgColor="bg-red-50"
    />
  );
};

export default MugPrintingTemplate;
