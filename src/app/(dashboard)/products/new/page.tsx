import ProductForm from "../../../../modules/products/new/components/product-form";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm />
      </div>
    </div>
  );
};

export default ProductPage;
