import { BillboardForm } from "./components/billboard-form";
import { supabase } from "@/utils/supabase";

const BillboardPage = async ({
  params
}: {
  params: { billboardId: string }
}) => {
  
  const { data: billboard, error } = await supabase
  .from('billboard')
  .select('*')
  .eq('id', params.billboardId)
  .single(); 

if (error) {
  console.error('Error fetching billboard:', error);
}

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}

export default BillboardPage;
