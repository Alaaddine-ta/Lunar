import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { supabase } from "@/utils/supabase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { items , formData , totalPrice} = await req.json();

  if (!items || items.length === 0 || !formData || formData.length === 0) {
    return new NextResponse("Items are required", { status: 400 });
  }


  try {
    // Create a new order in the database, using the detailed product information from the `items` field
    // const { data, error: orderError } = await supabase.from("orders").insert({
    //   items: items,
    //   email: formData.email,
    //   fullName: formData.fullName,
    //   deliveryAddress : formData.deliveryAddress,
    //   phoneNumber: formData.phoneNumber,
    //   shippingMethod: formData.shippingMethod,
    //   totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
    // });

    // if (orderError) {
    //   console.error(orderError);
    //   return new NextResponse("Failed to create order", {status :500}) ;
    // }

    // NextResponse.json({ url: session.url }, {
    //   headers: corsHeaders
    // });
    return NextResponse.json({items , formData , totalPrice}, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500, headers: corsHeaders });
    }
 

  // const order = await prismadb.order.create({
  //   data: {
  //     storeId: params.storeId,
  //     isPaid: false,
  //     orderItems: {
  //       create: productIds.map((productId: string) => ({
  //         product: {
  //           connect: {
  //             id: productId
  //           }
  //         }
  //       }))
  //     }
  //   }
  // });
};
