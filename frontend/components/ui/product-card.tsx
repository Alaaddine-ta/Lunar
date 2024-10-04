'use client'
import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface ProductCardProps {
  data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

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

  const DISCOUNT_PERCENTAGE = 15;
  const rawDiscountedPrice = data.price * (1 - DISCOUNT_PERCENTAGE / 100);
  const discountedPrice = roundToReasonablePrice(rawDiscountedPrice);
  const actualDiscount = ((data.price - discountedPrice) / data.price) * 100;

  const isOutOfStock = data.quantity === 0; 

  return ( 
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 relative">
      {isOutOfStock && (
        <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Épuisé
        </div>
      )}
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data.image?.[0]?.url} 
          alt={data.name} 
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            {!isOutOfStock && (
              <IconButton
                onClick={onAddToCart} 
                icon={<ShoppingCart size={20} className="text-gray-600" />} 
              />
            )}
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Discount */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-blue-600">{data.price} DH</span>
          <div className="flex items-center mt-1">
            <span className="text-sm line-through text-gray-500 mr-2">{data.original_price} DH</span>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full border border-red-200">
              -{Math.round(actualDiscount)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;