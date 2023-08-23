import { IProductSelection, Product } from "../types";
import Loader from "../components/Loader";

function ProductSelection(props: IProductSelection) {
  const { onSelection, selectedProducts, data, loading } = props;

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="mb-6">Select Products</h2>
      <div className="flex flex-wrap justify-between px-2 py-2 productsScrollStyle">
        {data?.products.map((product: Product) => {
          const selectedItem = product.id in selectedProducts ? "outline" : "";
          const {
            thumbnail,
            discountPercentage,
            title,
            discountedPrice,
            price,
            rating,
          } = product;

          return (
            <div
              key={product?.id}
              className={`relative m-1 flex w-80 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md cursor-pointer ${selectedItem}`}
              onClick={() => {
                onSelection(product);
              }}
            >
              <div className="relative mx-3 mt-3 flex h-52 overflow-hidden rounded-xl">
                <img
                  className="object-cover"
                  src={thumbnail}
                  alt="productimage"
                />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  {discountPercentage}%
                </span>
              </div>
              <div className="mt-4 px-5 pb-5">
                <div>
                  <h5 className="text-xl tracking-tight text-slate-900">
                    {title}
                  </h5>
                </div>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl  font-bold text-slate-900">
                      ₹{discountedPrice}
                    </span>
                    <span className="text-md ml-1 text-slate-900 line-through">
                      {price}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                      ★{rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductSelection;
