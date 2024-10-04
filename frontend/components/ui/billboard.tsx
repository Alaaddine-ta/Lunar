'use client'
import type  { Billboard } from "@/types";
import { useRouter } from "next/navigation";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push('/category/6');  
  };
    return (
    <div >
    <section className="relative w-full h-[600px] overflow-hidden">
    <div style={{ backgroundImage: `url(${data?.imageUrl})` }} className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-8 text-center rounded-md">
      <h2 className="text-2xl font-bold">ÉLÉGANCE RÉINVENTÉE</h2>
      <p className="mt-4 text-gray-700">
      {data?.label}
      </p>
      <button           onClick={handleBuyNow}
 className="mt-6 px-6 py-2 bg-black text-white rounded-full">Achetez Maintenant </button>
    </div>
    </div>

  </section>
</div>
    // <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
    //   <div style={{ backgroundImage: `url(${data?.imageUrl})` }} className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
    //     <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
    //       <div className="font-bold text-sm sm:text-5xl lg:text-2xl sm:max-w-xl max-w-xs">
    //         {data?.label}
    //       </div>
    //     </div>
    //   </div>
    // </div>
   );
};

export default Billboard;
