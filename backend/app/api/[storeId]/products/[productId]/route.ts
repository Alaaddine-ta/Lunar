import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { supabase } from "@/utils/supabase";

export async function GET(
  req: Request,
  { params }: { params: { productId: number } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const { data: product, error } = await supabase
      .from('product')
      .select(`
   *,
    image (*),
    category (*),
    size (*),
    color (*)
  `)
    .eq('id', params.productId)


    if (error) {
      console.log('Error Get the product : ', product)
    }
    return NextResponse.json(product?.[0]);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const { data: product, error: errorDeletingProduct } = await supabase
      .from('product')
      .delete()
      .eq('id', params.productId)
      .select()

    if (errorDeletingProduct) {
      console.error('Error deleting Category:', errorDeletingProduct);

    }

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, price, categoryId, images, colorId, sizeId, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizeId) {
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

    // Update the product
    const { data: updatedProduct, error: updateError } = await supabase
      .from('product')
      .update({
        name,
        price,
        categoryId: categoryId,
        colorId: colorId,
        sizeId: sizeId,
        isFeatured: isFeatured,
        isArchived: isArchived,
      })
      .eq('id', params.productId)
      .select()

    if (updateError) {
      console.log("ERROR UPDATE THE PRODUCT: ",updateError)
      throw updateError;
    }
   
    // Delete all existing images for the product
const { error: deleteImagesError } = await supabase
.from('image')
.delete()
.eq('productId', params.productId);

if (deleteImagesError) {
  console.log("ERROR DELETE THE IMAGE: ",updateError)
throw deleteImagesError;
}

// Insert new images
if (images && images.length > 0) {
const { error: insertImagesError } = await supabase
  .from('image')
  .insert(
    images.map((image: { url: string }) => ({
      productId: params.productId,
      url: image.url,
    }))
  );

if (insertImagesError) {
  console.log("ERROR INSERT THE IMAGE: ",insertImagesError)
  throw insertImagesError;
}
}

  // Fetch the updated product with its new images
const { data: product, error: fetchError } = await supabase
.from('product')
.select(`
  *,
  image (*)
`)
.eq('id', params.productId)
.single();

if (fetchError) {
  console.log("ERROR FETCH THE UPDATED PRODUCT: ",fetchError)

throw fetchError;
}

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
