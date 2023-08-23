import { GlobalState, GlobalAction } from "../types";

const initialFormState = {
  name: "",
  addr_1: "",
  addr_2: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  tel: "",
};

export const initialState: GlobalState = {
  currentStep: 1,
  selectedProducts: {},
  formState: initialFormState,
  orderLoading: false,
  OrderStatusMessage: "",
};

const reducer = (state: GlobalState, action: GlobalAction): GlobalState => {
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
