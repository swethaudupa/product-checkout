import React, { useMemo } from "react";
import { IOrderSummary } from "../types";
import { calculateTotals } from "../utils";
import Address from "../components/Address";

function OrderSummary(props: IOrderSummary) {
  const { selectedItems, formState } = props;
  const productList = Object.values(selectedItems);
  const { totalDiscountedPrice, totalPrice, totalDiscountPercentage } = useMemo(
    () => calculateTotals(productList),
    [productList]
  );

  return (
    <div className="w-full">
      <h2 className="mb-6">Order Summary</h2>
      <div className="flex flex-row">
        <div className="mt-8 mr-8 space-y-3 rounded-lg bg-neutral-alabaster px-2 py-4 sm:px-6 basis-3/5 border-neutral-cool-gray">
          <h3 className="mb-4">Customer's cart</h3>
          <div className="productsScrollStyle">
            {Object.values(selectedItems).map((val) => {
              return (
                <div key={val.id} className="flex flex-col sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={val.thumbnail}
                    alt="productimage"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{val.title}</span>
                    <span className="float-right">{val.brand}</span>
                    <p>
                      <span className="text-xl  font-bold text-slate-900">
                        ₹{val.discountedPrice}
                      </span>
                      <span className="text-sm ml-1 text-slate-900 line-through">
                        {val.price}
                      </span>
                    </p>
                    <div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="basis-2/5">
          <div className="mt-8 pl-6 py-2 bg-neutral-alabaster">
            <h3 className="mb-6">Shipping Address</h3>
            <Address {...formState} />
          </div>
          <div className="mt-6 border-b py-2">
            <h3 className="mb-6">Summary</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p>
                <span className="font-semibold text-gray-900">
                  ₹{totalDiscountedPrice}
                </span>
                <span className="text-xs ml-1 text-slate-900 line-through">
                  {totalPrice}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">₹8.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Total Discount
              </p>
              <p className="font-semibold text-gray-900">
                {`${totalDiscountPercentage.toFixed(2)}%`}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              {totalDiscountedPrice + 8}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
