import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { supabase } from '@/utils/supabase';

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const {data: store, error} = await supabase
    .from('store')
    .insert([
      {name, userId}
    ])
    .select()
  
    console.log('store:',store)
    if(error){
      console.log('Error creating store:',error);
      return NextResponse.error()
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
