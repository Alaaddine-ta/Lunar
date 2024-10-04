import { Database } from "@/lib/database.types";
import { ProductForm } from "./components/product-form";
import { supabase } from "@/utils/supabase";

type Product = Database['public']['Tables']['product']['Row'] & { images: Image[] };
type Category = Database['public']['Tables']['category']['Row'];
type Size = Database['public']['Tables']['size']['Row'];
type Color = Database['public']['Tables']['color']['Row'];
type Image = Database['public']['Tables']['image']['Row'];

const ProductPage = async ({
  params
}: {
  params: { productId: number, storeId: string }
}) => {
  const { data: product, error } = await supabase
    .from('product')
    .select('*, image(*)')
    .eq('id', params.productId)
    .single();

  if (error) {
    console.error("Error getting the product : ", error);
  }

  const { data: categories, error: errorGettingCategories } = await supabase
    .from('category')
    .select('*')
    .eq('storeId', params.storeId);

  if (errorGettingCategories) {
    console.error("Error getting the categories : ", errorGettingCategories);
  }

  const { data: sizes, error: errorGettingSizes } = await supabase
    .from('size')
    .select('*')
    .eq('storeId', params.storeId);

  if (errorGettingSizes) {
    console.error("Error getting the size : ", errorGettingSizes);
  }

  const { data: colors, error: errorGettingColors } = await supabase
    .from('color')
    .select('*')
    .eq('storeId', params.storeId);

  if (errorGettingColors) {
    console.error("Error getting the color : ", errorGettingColors);
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product as Product | null}
          categories={categories as Category[] || []}
          colors={colors as Color[] || []}
          sizes={sizes as Size[] || []}
        />
      </div>
    </div>
  );
}

export default ProductPage;