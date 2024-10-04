import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";


import { SettingsForm } from "./components/settings-form";
import { supabase } from "@/utils/supabase";

const SettingsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const {data : store , error} = await supabase
  .from('store')
  .select('*')
  .eq('id',params.storeId)
  .eq('userId', userId) 

  console.log("store:", store)
  if (!store) {
    redirect('/');
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store[0]} />
      </div>
    </div>
  );
}

export default SettingsPage;
