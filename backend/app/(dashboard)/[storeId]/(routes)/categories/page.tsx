import { format, parseISO } from "date-fns";


import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";
import { supabase } from "@/utils/supabase";

const CategoriesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const { data: categories, error} = await supabase
  .from('category')
  .select('*,billboard(*)')
  .eq('storeId', params.storeId)
  .order('createdAt', { ascending: false })

  if(error) {
    console.log('ERROR SELECT CATEGORIES: ', error)
  }
  const formattedCategories: CategoryColumn[] = categories!.map((item) => ({
    id: item.id,
    name: item.name, 
    billboardLabel: item!.billboard!.label,
    createdAt: format(parseISO(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
