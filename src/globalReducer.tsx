import { IProducts, Product } from "./App";

export interface FormState {
  name: string;
  addr_1: string;
  addr_2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  tel: string;
}

export const initialFormState = {
  name: "",
  addr_1: "",
  addr_2: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  tel: "",
};

interface State {
  currentStep: number;
  selectedProducts: IProducts;
  formState: FormState;
  orderLoading: boolean;
  OrderStatusMessage: string;
}

type Action =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SELECT_PRODUCT"; payload: Product }
  | { type: "UPDATE_FIELD"; field: string; value: any }
  | { type: "START" }
  | { type: "SUCCESS"; OrderStatusMessage: string }
  | { type: "FAILURE"; OrderStatusMessage: string };

export const initialState: State = {
  currentStep: 1,
  selectedProducts: {},
  formState: initialFormState,
  orderLoading: false,
  OrderStatusMessage: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };
    case "SELECT_PRODUCT":
      const productId = action.payload.id;
      if (!state.selectedProducts[productId]) {
        return {
          ...state,
          selectedProducts: {
            ...state.selectedProducts,
            [productId]: action.payload,
          },
        };
      } else {
        const { [productId]: _, ...rest } = state.selectedProducts;
        return { ...state, selectedProducts: rest };
      }
    case "UPDATE_FIELD":
      return {
        ...state,
        formState: {
          ...state.formState,
          [action.field]: action.value,
        },
      };
    case "START":
      return { ...state, orderLoading: true };
    case "SUCCESS":
      return {
        ...state,
        orderLoading: false,
        OrderStatusMessage: action.OrderStatusMessage,
      };
    case "FAILURE":
      return {
        ...state,
        orderLoading: false,
        OrderStatusMessage: action.OrderStatusMessage,
      };
    default:
      return state;
  }
};

export default reducer;
