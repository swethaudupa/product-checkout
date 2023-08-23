import React, { ChangeEvent } from "react";
import { addressFields } from "../constants";
import { FormState, IAddressForm } from "../types";

const styles = {
  container: "w-full md:max-w-full mx-auto",
  heading: "mb-6",
  formContainer: "p-6 border border-gray-300 sm:rounded-md productsScrollStyle",
  label:
    "block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400",
  input:
    "peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400",
  field: "my-2",
};

function AddressForm(props: IAddressForm) {
  const { handleInputChange, formState } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Shipping Address</h2>
      <div className={styles.formContainer}>
        <form>
          {addressFields.map((val) => (
            <fieldset className={styles.field} key={val.id}>
              <label className={styles.label}>{val.name}</label>
              <input
                name={val.name.toLocaleLowerCase()}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(val.id as keyof FormState, e.target.value)
                }
                value={formState[val.id as keyof FormState]}
                className={styles.input}
              />
            </fieldset>
          ))}
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
