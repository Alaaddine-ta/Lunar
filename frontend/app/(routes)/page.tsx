import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import Link from "next/link";
import SupportedBy from "./components/suported-by";
import HandbagShowcase from "./components/handbag-showcase";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  console.log('products : ',products)
  
  const billboard = await getBillboard("587c8974-c684-40bb-bf51-351d1c37d08e");
  return (
    <Container>
      {/* <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden"> */}

      <Billboard
        data={billboard[0]}
      />

      {/* SECTION */}
      <div className="relative flex min-h-[220px] w-full items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://solutions-cms-contentstack-commerce.vercel.app/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fblt37e5d9fa4b15e084%2Fblte154c78d7196e1c0%2F5fb11bb442256d5ffdf435e6%2Flp_giftguide_afterpay.jpg&w=3840&q=75"
            alt="Background image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="z-10 flex flex-col items-center gap-4 rounded-lg bg-background/80 p-8 backdrop-blur-sm">
          <h2 className="text-4xl font-bold tracking-tight text-primary">15% DE RÉDUCTION SUR TOUS LES ARTICLES!</h2>
          {/* <p className="text-muted-foreground">Use Code 84778 | Exclusions Apply</p> */}
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            ACHETEZ MAINTENANT | DÉTAILS
          </Link>
        </div>
      </div>
      {/* SECTION */}


      <SupportedBy />

      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Nos produits du moment" items={products} />
      </div>

      <HandbagShowcase />
    </Container>
  )
};

export default HomePage;
