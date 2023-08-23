import { Dispatch } from "react";
import { FormState, GlobalAction, Product, ProductItem } from "../types";

export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
) => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return Math.round(discountedPrice);
};

export function areAllFieldsFilled(form: FormState): boolean {
  const fields = Object.values(form);
  return fields.some((field) => field.trim() !== "");
}

export const simulateAPICall = (dispatch: Dispatch<GlobalAction>): void => {
  dispatch({ type: "START" });
  const delay = Math.random() * 3000 + 1000; // Random delay between 1 to 4 seconds

  setTimeout(() => {
    // Simulating success or failure based on a 20% failure rate
    const shouldFail = Math.random() < 0.2;
    if (shouldFail) {
      dispatch({ type: "FAILURE", OrderStatusMessage: "Order failed! ❌" });
    } else {
      dispatch({
        type: "SUCCESS",
        OrderStatusMessage: "Order successful! 👍",
      });
    }
  }, delay);
};

export function calculateTotals(products: Product[]) {
  const { totalDiscountedPrice, totalPrice } = products.reduce(
    (totals, product) => {
      return {
        totalDiscountedPrice:
          totals.totalDiscountedPrice + product.discountedPrice,
        totalPrice: totals.totalPrice + product.price,
      };
    },
    { totalDiscountedPrice: 0, totalPrice: 0 }
  );

  const totalDiscountPercentage =
    ((totalPrice - totalDiscountedPrice) / totalPrice) * 100;

  return {
    totalDiscountedPrice,
    totalPrice,
    totalDiscountPercentage,
  };
}

export const formatProducts = (data: ProductItem) => {
  if (!data) {
    return;
  }
  return {
    ...data,
    products: data.products?.map((product) => {
      const discountedPrice = calculateDiscountedPrice(
        product.price,
        product.discountPercentage
      );
      return { ...product, discountedPrice };
    }),
  };
};
