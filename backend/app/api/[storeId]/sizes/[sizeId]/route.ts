import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import { supabase } from "@/utils/supabase";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const { data: size, error } = await supabase
      .from('size')
      .select('*')
      .eq('id', params.sizeId)
      .select()

    if (error) {
      console.log('Erro Get the size : ', error)
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string, storeId: number } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const { data: size, error: errorDeletingSize } = await supabase
      .from('size')
      .delete()
      .eq('id', params.sizeId)
      .select()

    if (errorDeletingSize) {
      console.error('Error deleting size:', errorDeletingSize);

    }

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string, storeId: number } }
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


    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const { data: size, error: errorUpdatedSize } = await supabase
      .from('size')
      .update({ name, value })
      .eq('id', params.sizeId)
      .select()

    if (errorUpdatedSize) {
      console.error('Error updating Size:', errorUpdatedSize);
    }


    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
