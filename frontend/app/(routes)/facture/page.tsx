'use client'
import { CalendarIcon, CreditCardIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// // Define types for our data structure
// type OrderItem = {
//   categoryId: number;
//   colorName: string;
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   sizeName: string;
// };

// type Order = {
//   id: number;
//   address: string;
//   createdAt: string;
//   email: string;
//   fullName: string;
//   isPaid: boolean;
//   orderItems: OrderItem[];
//   phone: string;
//   shippingMethod: string;
//   totalPrice: number;
// };

// type OrderData = {
//   order: Order;
// };

export default function FacturePage() {
  // const [orderData, setOrderData] = useState<OrderData | null>(null);

  const [orderData, setOrderData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrderData(JSON.parse(lastOrder));
      localStorage.removeItem('lastOrder');
    } else {
      router.push('/');
    }
  }, [router]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const { order } = orderData;
  const { orderItems } = order;
console.log("orderData : ",orderData)
console.log("order : ",order)

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center">
              LUNAR
              {/* <img src="/placeholder.svg?height=60&width=200" alt="Company Logo" className="h-15 w-auto" /> */}
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-between">
                  <div>Invoice #: <span className="font-bold">{order.id}</span></div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">Commande de:</p>
                    <p>{order.fullName}</p>
                    <p>{order.address}</p>
                    <p>{order.email}</p>
                    <p>{order.phone}</p>
                  </div>
                  <div className={`flex items-center ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} px-3 py-1 rounded-full text-sm font-semibold`}>
                    <CreditCardIcon className="h-4 w-4 mr-1" />
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </div>
                </div>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantite</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderItems.map((item:any, index:any) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.name} ({item.colorName}, {item.sizeName})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price} DH</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price * item.quantity} DH</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Sous-total :</span>
                  <span>{order.totalPrice} DH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Methode de livraison :</span>
                  <span>{order.shippingMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Frais de livraison :</span>
                  <span>{order.deliveryFee} DH </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>{order.totalPrice + order.deliveryFee}  DH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}