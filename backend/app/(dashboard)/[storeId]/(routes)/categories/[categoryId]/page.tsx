
import { CategoryForm } from "./components/category-form";
import { supabase } from "@/utils/supabase";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, storeId: string }
}) => { 

  const { data: category, error} = await supabase
  .from('category')
  .select('*')
  .eq('id',params.categoryId)
  .single();
  
  console.log('category : ',category)

  if(error) {
    console.log('ERROR fetching the category ')
  }

  const { data: billboards, error: errorBillboard} = await supabase
  .from('billboard')
  .select('*')
  .eq('storeId',params.storeId)
  .select()

  if(errorBillboard) {
    console.log('ERROR fetching the billboard ')
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
       <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}

export default CategoryPage;
