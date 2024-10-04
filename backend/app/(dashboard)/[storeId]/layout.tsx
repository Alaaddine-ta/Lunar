import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import { supabase } from '@/utils/supabase';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: number }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const { data: store, error } = await supabase
    .from('store')
    .select('*')
    //.eq('id', params.storeId)
    .eq('userId', userId)
    .single(); 

if (error) {
    console.error('Error fetching store:', error);
} else {
    console.log('Store:', store);
}


  if (!store) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
