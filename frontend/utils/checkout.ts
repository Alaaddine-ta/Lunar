import { supabase } from "@/utils/supabase";

export const checkout = async (formData:any,orderItems:any,totalPrice:any) => {
    const {data: dataOrder,error: errorOrder} = await supabase.from('order').insert(
        { email: formData.email, 
          fullName: formData.fullName ,
          adress: formData.deliveryAddress,
          phone: formData.phoneNumber,
          shippingMethod: "pay_on_delivery",
          orderItems : orderItems,
          totalPrice: totalPrice
        }
      )
      return dataOrder ;
}
