import ProductList from "@/modules/products/components/product-list";

 
const ProductsPage = () => {
  return ( 
    <div className="flex flex-col space-y-7 py-6 w-full" >
      <ProductList/>

    </div>
   );
}
 
export default ProductsPage;