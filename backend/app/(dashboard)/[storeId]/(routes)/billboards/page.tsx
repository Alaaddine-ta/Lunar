import { format, parseISO } from "date-fns";

import { BillboardColumn } from "./components/columns"
import { BillboardClient } from "./components/client";
import { supabase } from "@/utils/supabase";

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const {data: billboards, error } = await supabase
  .from('billboard')
  .select('*')
  .eq('storeId', params.storeId)
  .order('createdAt', { ascending: false})
  
  if (error) {
    console.error('Error fetching billboards:', error);
  }

  const formattedBillboards: BillboardColumn[] = billboards!.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(parseISO(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
