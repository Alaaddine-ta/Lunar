"use client";

import { ShoppingCart } from "lucide-react";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
  isOutOfStock: boolean;
}

const Info: React.FC<InfoProps> = ({ data, isOutOfStock }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  }

  const roundToReasonablePrice = (price: number): number => {
    const wholePart = Math.floor(price);
    const decimalPart = price - wholePart;

    if (decimalPart < 0.5) {
      return wholePart;
    } else if (decimalPart >= 0.5 && decimalPart < 0.9) {
      return wholePart + 0.9;
    } else {
      return wholePart + 1;
    }
  }

  const rawDiscountedPrice = data.price * 0.85;
  const discountedPrice = roundToReasonablePrice(rawDiscountedPrice);
  const actualDiscount = ((data.price - discountedPrice) / data.price) * 100;

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex flex-col">
        <div className="flex items-center">
          <p className="text-3xl font-bold text-blue-600">
            <span className="text-2xl font-bold text-blue-600">{data.price} DH</span>
          </p>
          <span className="ml-3 bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded-full border border-red-200">
            -{actualDiscount.toFixed(0)}%
          </span>
          {isOutOfStock && (
            <span className="ml-3 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
              Épuisé
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center">
          <p className="text-lg text-gray-500 line-through">
            {data.original_price} DH
          </p>
          <p className="ml-2 text-sm text-gray-600">
            Prix original
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Taille:</h3>
          <div>
            {data?.size?.value}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Couleur:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button 
          onClick={onAddToCart} 
          className={`flex items-center gap-x-2 px-6 py-3 rounded-full transition duration-300 ${
            isOutOfStock 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Épuisé' : 'Ajouter au panier'}
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
}
 
export default Info;