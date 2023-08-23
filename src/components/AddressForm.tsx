import { ChangeEvent, useReducer } from "react";
import "../App.css";
import { FormState } from "../globalReducer";

interface Fields {
  name: string;
  id: number | string;
}

interface IAddressForm {
  addressFields: Fields[];
  handleInputChange: (field: keyof FormState, value: string) => void;
  formState: FormState;
}

function AddressForm(props: IAddressForm) {
  const { addressFields, handleInputChange, formState } = props;

  return (
    <div className="w-full md:max-w-full mx-auto ">
      <h2 className="mb-6">Shipping Address</h2>
      <div className="p-6 border border-gray-300 sm:rounded-md productsScrollStyle">
        <form>
          {addressFields.map((val) => (
            <fieldset className="my-2" key={val.id}>
              <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                {val.name}
              </label>
              <input
                name={val.name.toLocaleLowerCase()}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(val.id as keyof FormState, e.target.value)
                }
                value={formState[val.id as keyof FormState]}
                className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
              />
            </fieldset>
          ))}
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
