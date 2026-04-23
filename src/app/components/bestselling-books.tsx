import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const bestsellingBooksData = [
  {
    title: "Sapiens: Краткая история человечества",
    author: "Юваль Ной Харари",
    price: "990₽",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3xlbnwxfHx8fDE3NzUzMTIwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Думай медленно... решай быстро",
    author: "Даниел Канеман",
    price: "850₽",
    imageUrl: "https://images.unsplash.com/photo-1583321500600-320b9122393a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYnN5Y2hvbG9neSUyMGJvb2t8ZW58MXx8fHwxNzc1MzEyMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "От хорошего к великому",
    author: "Джим Коллинз",
    price: "920₽",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJvb2t8ZW58MXx8fHwxNzc1MzEyMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Властелин колец",
    author: "Дж. Р. Р. Толкин",
    price: "1200₽",
    imageUrl: "https://images.unsplash.com/photo-1509266-701333589973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9va3xlbnwxfHx8fDE3NzUzMTIwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function BestsellingBooks() {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Лидеры продаж</h2>
            <Button variant="outline">Смотреть все</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellingBooksData.map((book, index) => (
            <Card key={index} className="overflow-hidden text-center">
              <CardContent className="p-0">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4">{book.author}</p>
                  <p className="text-lg font-semibold text-blue-600 mb-4">{book.price}</p>
                  <Button>Добавить в корзину</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
