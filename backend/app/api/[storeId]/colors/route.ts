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
      console.error('Error fetching store in color api:', error);
    }

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: color, error: ErrorCreatingColor } = await supabase
    .from('color')
    .insert([
      {
        name:name,
        value:value,
        storeId: params.storeId,
      }
    ])
    .select();

  if (ErrorCreatingColor) {
    console.error('Error creating color:', ErrorCreatingColor);
  }

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLORS_POST]', error);
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

    const { data: colors, error } = await supabase
      .from('color')
      .select('*')
      .eq('storeId', params.storeId)
      
    if (error) {
      console.error('Error fetching colors:', error);

    }
  
    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
