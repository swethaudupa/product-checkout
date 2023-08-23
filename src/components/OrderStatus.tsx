import Loader from "./Loader";

function OrderStatus({
  orderLoading,
  OrderStatusMessage,
}: {
  orderLoading: boolean;
  OrderStatusMessage: string;
}) {
  if (orderLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p
        className={`text-3xl  ${
          OrderStatusMessage.includes("failed")
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {OrderStatusMessage}
      </p>
    </div>
  );
}

export default OrderStatus;
