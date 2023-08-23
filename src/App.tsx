import React, { useCallback, useReducer } from "react";
import "./App.css";
import StepperControl from "./components/StepperControl";
import Stepper from "./components/Stepper";
import ProductSelection from "./components/ProductSelection";
import AddressForm from "./components/AddressForm";
import OrderSummary from "./components/OrderSummary";
import useFetch from "./hooks/useFetch";
import reducer, { FormState, initialState } from "./globalReducer";
import OrderStatus from "./components/OrderStatus";

interface ProductItem {
  products: Product[];
}

const steps = [
  { step: 1, title: "Product Selection" },
  { step: 2, title: "Shipping Address" },
  { step: 3, title: "Checkout" },
  { step: 4, title: "Order Status" },
];

const addressFields = [
  { id: "name", name: "Your name" },
  { id: "addr_1", name: "Address line 1" },
  { id: "addr_2", name: "Address line 2" },
  { id: "city", name: "City" },
  { id: "state", name: "State/Province" },
  { id: "zipcode", name: "Zip/Postal code" },
  { id: "country", name: "Country" },
  { id: "tel", name: "Telephone" },
];
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProducts {
  [id: number]: Product;
}

const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
) => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return Math.round(discountedPrice);
};

function areAllFieldsFilled(form: FormState): boolean {
  const fields = Object.values(form);
  return fields.some((field) => field.trim() !== "");
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedProducts,
    currentStep,
    formState,
    orderLoading,
    OrderStatusMessage,
  } = state;

  const handleInputChange = (field: keyof FormState, value: string) => {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });
  };

  const callbackFn = useCallback((data: ProductItem) => {
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
  }, []);

  const { data, loading } = useFetch<ProductItem>({
    url: "https://dummyjson.com/products",
    callback: callbackFn,
  });

  const handleProductSelection = (product: Product) => {
    dispatch({ type: "SELECT_PRODUCT", payload: product });
  };

  const simulateAPICall = (): void => {
    dispatch({ type: "START" });

    // Simulating an API call after a random delay
    const delay = Math.random() * 3000 + 1000; // Random delay between 1 to 4 seconds

    setTimeout(() => {
      // Simulating success or failure based on a 20% failure rate
      const shouldFail = Math.random() < 0.2;
      if (shouldFail) {
        dispatch({ type: "FAILURE", OrderStatusMessage: "Order failed! ❌" });
      } else {
        dispatch({
          type: "SUCCESS",
          OrderStatusMessage: "Order successful! 👍 ",
        });
      }
    }, delay);
  };

  const onStepperControlClick = (direction: string) => {
    let newStep = currentStep;
    if (direction === "next") {
      switch (currentStep) {
        case 1: {
          if (Object.keys(selectedProducts).length !== 0) {
            newStep++;
          }
          break;
        }
        case 2: {
          if (areAllFieldsFilled(formState)) {
            newStep++;
          }
          break;
        }
        case 3: {
          simulateAPICall();
          newStep++;
          break;
        }
        default:
          break;
      }
    } else {
      if (currentStep === 1) return;
      newStep--;
    }
    dispatch({ type: "SET_CURRENT_STEP", payload: newStep });
  };

  const renderPages = (step: number) => {
    switch (step) {
      case 1:
        return (
          <ProductSelection
            onSelection={handleProductSelection}
            selectedProducts={selectedProducts}
            data={data}
            loading={loading}
          />
        );
      case 2:
        return (
          <AddressForm
            addressFields={addressFields}
            formState={formState}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <OrderSummary
            formState={formState}
            selectedItems={selectedProducts}
          />
        );
      case 4:
        return (
          <OrderStatus
            orderLoading={orderLoading}
            OrderStatusMessage={OrderStatusMessage}
          />
        );
      default:
    }
  };

  return (
    <main className="flex flex-col text-neutral-cool-gray lg:flex-row grow  lg:rounded-lg lg:bg-white lg:shadow lg:h-screen">
      <Stepper currentStep={currentStep} steps={steps} />
      <div className="px-4 relative bg-neutral-magnolia lg:bg-transparent lg:flex lg:flex-col lg:w-full">
        <div className="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem] -translate-y-[4.5rem] flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0">
          {renderPages(currentStep)}
        </div>
        <StepperControl
          handleClick={onStepperControlClick}
          steps={steps}
          currentStep={currentStep}
        />
      </div>
    </main>
  );
}

export default App;
