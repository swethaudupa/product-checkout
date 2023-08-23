import { FormState } from "../types";

const Address: React.FC<FormState> = ({
  name,
  addr_1,
  addr_2,
  city,
  state,
  zipcode,
  country,
  tel,
}) => {
  return (
    <>
      <h1>{name}</h1>
      <p>
        {addr_1}
        {addr_2 && `, ${addr_2}`}
        <br />
        {city}
        {state && `, ${state}`}
        <br />
        {zipcode}
        <br />
        {country}
      </p>
      {tel && <p>Tel: {tel}</p>}
    </>
  );
};

export default Address;
