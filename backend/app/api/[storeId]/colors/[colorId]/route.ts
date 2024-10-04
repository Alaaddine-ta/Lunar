import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { supabase } from "@/utils/supabase";


export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const { data: color, error } = await supabase
      .from('color')
      .select('*')
      .eq('id', params.colorId)

    if (error) {
      console.error('Error fetching color :', error);
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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
      console.error('Error fetching color by user ID:', error);
    }

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: color, error: errorDeletingColor } = await supabase
      .from('color')
      .delete()
      .eq('id', params.colorId)
      .select()

    if (errorDeletingColor) {
      console.error('Error deleting Color:', errorDeletingColor);

    }

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
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


    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const { data: color, error: errorUpdatedColor } = await supabase
      .from('color')
      .update({ name, value })
      .eq('id', params.colorId)
      .select()

    if (errorUpdatedColor) {
      console.error('Error updating Color:', errorUpdatedColor);
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
