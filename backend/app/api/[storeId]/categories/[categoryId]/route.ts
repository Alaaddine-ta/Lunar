import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { supabase } from "@/utils/supabase";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }


    const { data: category, error } = await supabase
      .from('category')
      .select('*,billboard(*)')
      .eq('id', params.categoryId)
      .select()

    if (error) {
      console.log('Erro Get the category : ', category)
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const { data: store, error } = await supabase
      .from('store')
      .select('*')
      .eq('id', params.storeId)
      .eq('userId', userId)
      .limit(1)
      .select()

    const storeByUserId = store?.[0] || null;

    if (error) {
      console.error('Error fetching store by user ID:', error);
    }


    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: category, error: errorDeletingCategory } = await supabase
      .from('category')
      .delete()
      .eq('id', params.categoryId)
      .select()

    if (errorDeletingCategory) {
      console.error('Error deleting Category:', errorDeletingCategory);

    }

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string, storeId: string } }
) {
  try {
    const { userId } = auth();
 
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const { data: store, error } = await supabase
      .from('store')
      .select('*')
      .eq('id', params.storeId)
      .eq('userId', userId)
      .limit(1)
      .select()

    const storeByUserId = store?.[0] || null;

    if (error) {
      console.error('Error fetching store by user ID:', error);
    }


    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: category, error: errorUpdatedCategory } = await supabase
      .from('category')
      .update({ name, billboardId })
      .eq('id', params.categoryId)
      .select()

    if (errorUpdatedCategory) {
      console.error('Error updating Category:', errorUpdatedCategory);
    }


    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
