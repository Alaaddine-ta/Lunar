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

    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
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

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const { data: storeByUserId, error } = await supabase
      .from('store')
      .select('*')
      .eq('id', params.storeId)
      .eq('userId', userId)


    if (error) {
      console.error('Error fetching store in PRODUCTS api:', error);
    }

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { data: product, error: errorCreateProduct } = await supabase
      .from('product')
      .insert({
        name: name,
        price: price,
        isFeatured: isFeatured,
        isArchived: isArchived,
        categoryId: categoryId,
        colorId: colorId,
        sizeId: sizeId,
        storeId: params.storeId,
      })
      .select()

    if (errorCreateProduct) {
      console.log('errorCreateProduct : ', errorCreateProduct)
      throw errorCreateProduct;
    }

    if (product) {
      const { error: imagesError } = await supabase
        .from('image')
        .insert(
          images.map((image: { url: string }) => ({
            productId: product[0].id,
            url: image.url,
          }))
        );

      if (imagesError) {
        throw imagesError;
      }
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: number } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    let query = supabase
      .from('product')
      .select(`
        *,
        image (*),
        category (*),
        color (*),
        size (*)
      `)
      .eq('storeId', params.storeId)
      .eq('isArchived', false)
      .order('createdAt', { ascending: false });

    if (categoryId) query = query.eq('categoryId', categoryId);
    if (colorId) query = query.eq('colorId', colorId);
    if (sizeId) query = query.eq('sizeId', sizeId);
    if (isFeatured) query = query.eq('isFeatured', true);

    const { data: products, error: errorSelectingProduct } = await query;

    if (errorSelectingProduct) {
      console.error('Error fetching products:', errorSelectingProduct);
      throw errorSelectingProduct;
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
