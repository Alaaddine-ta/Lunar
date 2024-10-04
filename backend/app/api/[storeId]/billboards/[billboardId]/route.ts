import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { supabase } from "@/utils/supabase";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const { data: billboard, error } = await supabase
      .from('billboard')
      .select('*')
      .eq('id', params.billboardId)
      .select()

      if (error) {
        console.log('Erro Get the billboard : ',billboard)
      }
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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

    const { data: billboard, error: errorDeletingBillboard } = await supabase
      .from('billboard')
      .delete()
      .eq('id', params.billboardId)
      .select()

    if (errorDeletingBillboard) {
      console.error('Error deleting billboard:', errorDeletingBillboard);

    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const { data: stores, error } = await supabase
      .from('store')
      .select('*')
      .eq('id', params.storeId)
      .eq('userId', userId)
      .limit(1)
      .select()

    const storeByUserId = stores?.[0] || null;

    if (error) {
      console.error('Error fetching store by user ID:', error);

    }

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: billboard, error: errorUpdatedBillboard } = await supabase
      .from('billboard')
      .update({ label, imageUrl })
      .eq('id', params.billboardId)
      .select()

    if (errorUpdatedBillboard) {
      console.error('Error updating billboard:', errorUpdatedBillboard);
    }



    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
