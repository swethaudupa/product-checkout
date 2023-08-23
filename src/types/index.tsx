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

export interface ProductItem {
  products: Product[];
}

export interface IProducts {
  [id: number]: Product;
}

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

export interface IAddressForm {
  handleInputChange: (field: keyof FormState, value: string) => void;
  formState: FormState;
}

export interface GlobalState {
  currentStep: number;
  selectedProducts: IProducts;
  formState: FormState;
  orderLoading: boolean;
  OrderStatusMessage: string;
}

export type GlobalAction =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SELECT_PRODUCT"; payload: Product }
  | { type: "UPDATE_FIELD"; field: string; value: any }
  | { type: "START" }
  | { type: "SUCCESS"; OrderStatusMessage: string }
  | { type: "FAILURE"; OrderStatusMessage: string };

export interface ISteps {
  step: number;
  title: string;
}

export interface IStepper {
  currentStep: number;
  steps: ISteps[];
}

export interface IStepperControl {
  handleClick: (direction: string) => void;
  currentStep: number;
  steps: ISteps[];
}

export interface ProductItem {
  products: Product[];
}

export interface IProductSelection {
  onSelection: (product: Product) => void;
  selectedProducts: IProducts;
  data: ProductItem | null;
  loading: boolean;
}

export interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export type FetchProps<T> = {
  url: string;
  callback?: (data: T) => void;
};

export interface IOrderSummary {
  selectedItems: IProducts;
  formState: FormState;
}
