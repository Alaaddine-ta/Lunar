import { format, parseISO } from "date-fns";

import { ColorColumn } from "./components/columns"
import { ColorClient } from "./components/client";
import { supabase } from "@/utils/supabase";

const ColorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  
  const { data: colors, error} = await supabase
  .from('color')
  .select('*')
  .eq('storeId', params.storeId)
  .order('createdAt', { ascending: false })

  if(error){
    console.log("ERROR GETTING THE COLOR : ",error)
  }

  const formattedColors: ColorColumn[] = colors!.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(parseISO(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
