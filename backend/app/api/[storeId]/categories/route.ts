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

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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
      console.error('Error fetching store in category api:', error);
    }

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: category, error: ErrorCreatingCategory } = await supabase
      .from('category')
      .insert([
        {
          name,
          billboardId,
          storeId: params.storeId,
        }
      ])
      .select();

    if (ErrorCreatingCategory) {
      console.error('Error creating category:', ErrorCreatingCategory);
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
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

    const { data: categories, error } = await supabase
      .from('category')
      .select('*')
      .eq('storeId', params.storeId)
      .select()

    if (error) {
      console.error('Error fetching categories:', error);

    }

    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
