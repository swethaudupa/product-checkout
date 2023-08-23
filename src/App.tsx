import React, { useCallback, useReducer } from "react";
import "./App.css";
import StepperControl from "./components/StepperControl";
import Stepper from "./components/Stepper";
import ProductSelection from "./pages/ProductSelection";
import AddressForm from "./pages/AddressForm";
import OrderSummary from "./pages/OrderSummary";
import useFetch from "./hooks/useFetch";
import reducer, { initialState } from "./reducers/globalReducer";
import OrderStatus from "./pages/OrderStatus";
import { FormState, Product, ProductItem } from "./types";
import { areAllFieldsFilled, formatProducts, simulateAPICall } from "./utils";
import { steps } from "./constants";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedProducts,
    currentStep,
    formState,
    orderLoading,
    OrderStatusMessage,
  } = state;

  const callbackFn = useCallback(formatProducts, []);
  const { data, loading } = useFetch<ProductItem>({
    url: "https://dummyjson.com/products",
    callback: callbackFn,
  });

  const handleProductSelection = (product: Product) => {
    dispatch({ type: "SELECT_PRODUCT", payload: product });
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
          simulateAPICall(dispatch);
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

  const handleInputChange = (field: keyof FormState, value: string) => {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });
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
