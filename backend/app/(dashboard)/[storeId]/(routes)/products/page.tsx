import { format, parseISO } from "date-fns";

import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { supabase } from "@/utils/supabase";

interface Product {
  id: number;
  storeId: number;
  categoryId: number;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;
  createdAt: string;
  updatedAt: string | null;
  category: {
    id: number;
    name: string;
    storeId: number;
    createdAt: string;
    updatedAt: string | null;
    billboardId: string;
  };
  size: {
    id: string;
    name: string;
    value: string;
    storeId: number;
    createdAt: string;
    updatedAt: string;
  };
  color: {
    id: string;
    name: string;
    value: string;
    storeId: number;
    createdAt: string;
    updatedAt: string | null;
  };
}

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {


  const { data: products, error } = await supabase
  .from('product')
  .select(`
    *,
    category:categoryId (*),
    size:sizeId (*),
    color:colorId (*)
  `)
  .eq('storeId', params.storeId)
  .order('createdAt', { ascending: false })
  .returns<Product[]>();

if (error) {
  console.error('Error fetching products:', error);
} 


  const formattedProducts: ProductColumn[] = products!.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    // price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(parseISO(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
