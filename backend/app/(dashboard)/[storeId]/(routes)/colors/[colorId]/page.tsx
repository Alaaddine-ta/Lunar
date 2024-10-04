
import { ColorForm } from "./components/color-form";
import { supabase } from "@/utils/supabase";

const ColorPage = async ({
  params
}: {
  params: { colorId: string }
}) => {

  const { data: color, error} = await supabase
  .from('color')
  .select('*')
  .eq('id',params.colorId)
  .single()
  
  if(error) {
    console.log('ERROR fetching the color ')
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}

export default ColorPage;
