"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { checkout } from "@/utils/checkout";
import { AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the city data structure
interface CityData {
  id: string;
  name: string;
  fee: number;
  deliveryTime: string;
}

// Simple array of city data
const citiesData: CityData[] = [
  { id: "1", name: "Casablanca", fee: 18, deliveryTime: "12H" },
  { id: "12", name: "Sidi rehal", fee: 29, deliveryTime: "12H" },
  { id: "7", name: "Ain harrouda", fee: 33, deliveryTime: "12H" },
  { id: "8", name: "Deroua", fee: 33, deliveryTime: "12H" },
  { id: "9", name: "Nouaceur", fee: 33, deliveryTime: "12H" },
  { id: "10", name: "Mediouna", fee: 33, deliveryTime: "12H" },
  { id: "11", name: "Tit melil", fee: 33, deliveryTime: "12H" },
  { id: "2", name: "Mohammedia", fee: 35, deliveryTime: "12H" },
  { id: "3", name: "Bouskoura", fee: 35, deliveryTime: "12H" },
  { id: "14", name: "Marrakech", fee: 35, deliveryTime: "24H" },
  { id: "15", name: "Meknes", fee: 35, deliveryTime: "24H" },
  { id: "16", name: "Tetouan", fee: 35, deliveryTime: "24H" },
  { id: "17", name: "Kenitra", fee: 35, deliveryTime: "24H" },
  { id: "18", name: "Rabat", fee: 35, deliveryTime: "24H" },
  { id: "19", name: "Sale", fee: 35, deliveryTime: "24H" },
  { id: "22", name: "Agadir", fee: 35, deliveryTime: "24H" },
  { id: "23", name: "Fes", fee: 35, deliveryTime: "24H" },
  { id: "26", name: "Tanger", fee: 35, deliveryTime: "24H" },
  { id: "46", name: "Tnine mhaya", fee: 45, deliveryTime: "24H - 72H" },
  { id: "47", name: "Ain taoujdate", fee: 45, deliveryTime: "24H - 72H" },
  { id: "48", name: "Sabaa aiyoun", fee: 45, deliveryTime: "24H - 72H" },
  { id: "49", name: "Boufakrane", fee: 45, deliveryTime: "24H - 72H" },
  { id: "50", name: "El hajeb", fee: 45, deliveryTime: "24H - 72H" },
];


export default function Summary() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const cart = useCart();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    deliveryAddress: "",
    phoneNumber: "",
    shippingMethod: "Paiement_à_la_livraison",
    city: "",
  });

  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "city") {
      const selectedCity = citiesData.find(city => city.name === value);
      setDeliveryFee(selectedCity ? selectedCity.fee : 0);
    }
  };

  const totalPrice = cart.totalPrice + deliveryFee;

  const onCheckout = async () => {
    if (!formData.email || !formData.fullName || !formData.deliveryAddress || !formData.phoneNumber || !formData.city) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const orderItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        categoryId: item.category.id,
        colorName: item.color.name,
        sizeName: item.size.name,
      }));

      const { data: checkoutOrder, error: errorOrder } = await supabase.from('order').insert(
        {
          email: formData.email,
          fullName: formData.fullName,
          address: formData.deliveryAddress,
          phone: formData.phoneNumber,
          shippingMethod: "paiement_a_la_livraison",
          orderItems: orderItems,
          totalPrice: cart.totalPrice,
          city: formData.city,
          deliveryFee: deliveryFee
        }
      ).select();

      if (errorOrder) {
        console.error('Supabase error:', errorOrder);
        toast.error(`Error submitting order: ${errorOrder}`);
        return;
      }

      if (checkoutOrder) {
        localStorage.setItem('lastOrder', JSON.stringify({
          order: checkoutOrder[0],
          totalPrice: cart.totalPrice,
          shippingfee: deliveryFee
        }));

        cart.totalPrice = 0;
        removeAll();
        toast.success('Commande soumise avec succès !');
        router.push('/facture');
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast.error('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    }
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">

    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Récapitulatif de la commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Détails de la commande</AlertTitle>
          <AlertDescription>
            Veuillez remplir tous les champs pour finaliser votre commande.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="fullName">Nom complet</label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="deliveryAddress">Adresse de livraison</label>
            <Input
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phoneNumber">Numéro de téléphone</label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city">Ville de livraison</label>
              <Select name="city" value={formData.city} onValueChange={(value) => handleInputChange({ target: { name: "city", value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une ville" />
                </SelectTrigger>
                <SelectContent>
                  {citiesData.map((city) => (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name} - Livraison: {city.fee} DH
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="shippingMethod">Méthode de paiement</label>
            <Select name="shippingMethod" value={formData.shippingMethod} onValueChange={(value) => handleInputChange({ target: { name: "shippingMethod", value } })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paiement_à_la_livraison">Paiement à la livraison</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span className="font-semibold">{cart.totalPrice} DH</span>
          </div>
          <div className="flex justify-between">
            <span>Frais de livraison</span>
            <span className="font-semibold">{deliveryFee} DH</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total de la commande</span>
            <span>{totalPrice} DH</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onCheckout} disabled={items.length === 0} className="w-full">
          Commander
        </Button>
      </CardFooter>
    </Card>
    
    </div>
  );
}

// const Summary =  () => {
//   const router = useRouter()
//   const items = useCart((state) => state.items);
//   const removeAll = useCart((state) => state.removeAll);
//   const cart = useCart()
//   const [formData, setFormData] = useState({
//     email: "",
//     fullName: "",
//     deliveryAddress: "",
//     phoneNumber: "",
//     shippingMethod: "Paiement_à_la_livraison",
//     city: "",
//   });

//   const [deliveryFee, setDeliveryFee] = useState(0);

   
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "city") {
//       const selectedCity = citiesData.find(city => city.name === value);
//       setDeliveryFee(selectedCity ? selectedCity.fee : 0);
//     }
//   };

//   const totalPrice = cart.totalPrice + deliveryFee;


//   const onCheckout = async () => {
//     if (!formData.email || !formData.fullName || !formData.deliveryAddress || !formData.phoneNumber || formData.city) {
//       toast.error("Veuillez remplir tous les champs.");
//       return;
//     }

//     try {


// const orderItems = items.map((item) => ({
//   id: item.id,
//   name: item.name,
//   price: item.price,
//   quantity: item.quantity,
//   categoryId: item.category.id,
//   colorName: item.color.name,
//   sizeName: item.size.name,
// }));

// const {data: checkoutOrder,error: errorOrder} = await supabase.from('order').insert(
//   { email: formData.email, 
//     fullName: formData.fullName ,
//     address: formData.deliveryAddress,
//     phone: formData.phoneNumber,
//     shippingMethod: "paiement_a_la_livraison",
//     orderItems : orderItems,
//     totalPrice: cart.totalPrice,
//     city: formData.city,
//     deliveryFee: deliveryFee
//   }
// )
// .select();

//     if (errorOrder) {
//       console.error('Supabase error:', errorOrder);
//       toast.error(`Error submitting order: ${errorOrder}`);
//       return;
//     }
//     if(checkoutOrder) {

//       // Store the order data and total price in localStorage before clearing the cart
//       localStorage.setItem('lastOrder', JSON.stringify({
//         order: checkoutOrder[0],
//         totalPrice: cart.totalPrice,
//         shippingfee: deliveryFee
//         // totalPrice: cart.totalPrice
//       }));
      
//       cart.totalPrice = 0 ;

//       removeAll()


//       if (cart.items.length === 0 && cart.totalPrice === 0) {
//         toast.success('Commande soumise avec succès !');
//         router.push('/facture');
//       } else {
//         removeAll()
//         cart.totalPrice = 0 ;
//         router.push('/facture');
//         toast.success('Commande soumise avec succès !');

//       }
//       // if(cart.totalPrice == 0 || removeAll()){
//       //     router.push('/facture'); 

//       //   }
      
//     }
//     } catch (error) {
//       console.error('Erreur inattendue:', error);
//       toast.error('Une erreur inattendue s\'est produite. Veuillez réessayer.');
//     }
    

//   }
//   return ( 
//     <div
//       className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
//     >
//       <h2 className="text-lg font-medium text-gray-900">
//         Récapitulatif de la commande
//       </h2>
//       <div className="mt-6 space-y-4">
//         <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//           {/* <div className="text-base font-medium text-gray-900">total de la commande</div>
//          <Currency value={totalPrice} /> */}

// <div>
//         <h2>Commande</h2>
//         <Alert>
//           <AlertTitle>Commande Details</AlertTitle>
//           <AlertDescription>
//             <form >
//               <div>
//                 <label htmlFor="email">Email</label>
//                 <Input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="fullName">Nom complet</label>
//                 <Input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="deliveryAddress">Adresse de livraison</label>
//                 <Input
//                   type="text"
//                   id="deliveryAddress"
//                   name="deliveryAddress"
//                   value={formData.deliveryAddress}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phoneNumber">Numero de telephone</label>
//                 <Input
//                   type="tel"
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="city">Ville de livraison</label>
//                 <select
//                   id="city"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 >
//                   <option value="">Sélectionnez une ville</option>
//                   {citiesData.map((city) => (
//                     <option key={city.id} value={city.name}>
//                       {city.name} - Livraison: {city.fee} DH
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="shippingMethod">Livraison</label>
//                 <select
//                   id="shippingMethod"
//                   name="shippingMethod"
//                   value={formData.shippingMethod}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="Methode de paiement">Paiement_à_la_livraison</option>
//                 </select>
//               </div>
//             </form>
//           </AlertDescription>
//         </Alert>
//         <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//           <div className="text-base font-medium text-gray-900">Sous-total</div>
//           {cart.totalPrice} DH
//         </div>
//         <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//           <div className="text-base font-medium text-gray-900">Frais de livraison</div>
//           {deliveryFee} DH
//         </div>
//         <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//           <div className="text-lg font-medium text-gray-900">Total de la commande</div>
//           {cart.totalPrice + deliveryFee} DH
//         </div>
//       </div>
//         </div>

        
//       </div>
//       <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
//         Commander
//       </Button>
//     </div>
//   );
// }
 
// export default Summary;