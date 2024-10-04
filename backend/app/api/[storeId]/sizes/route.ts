import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { supabase } from '@/utils/supabase';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: number } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const { data: storeByUserId, error } = await supabase
    .from('store')
    .select('*')
    .eq('id', params.storeId)
    .eq('userId', userId)
    .select();

  if (error) {
    console.error('Error fetching store in sizes api:', error);
  }



    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: size, error: ErrorCreatingSizes } = await supabase
    .from('size')
    .insert([
      {
        name,
        value,
        storeId: params.storeId,
      }
    ])
    .select();

  if (ErrorCreatingSizes) {
    console.error('Error creating sizes:', ErrorCreatingSizes);
  }

  
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: number } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    
    const { data: sizes, error } = await supabase
      .from('size')
      .select('*')
      .eq('storeId', params.storeId)
      .select()

    if (error) {
      console.error('Error fetching sizes:', error);

    }
  
    return NextResponse.json(sizes);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
