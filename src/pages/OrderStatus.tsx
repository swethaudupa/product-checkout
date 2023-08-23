import React from "react";
import Loader from "../components/Loader";

const styles = {
  container: "w-full h-full flex justify-center items-center",
  statusText: "text-3xl",
  failedStatus: "text-red-500",
  successStatus: "text-green-500",
};

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

  const statusClass = OrderStatusMessage.includes("failed")
    ? styles.failedStatus
    : styles.successStatus;

  return (
    <div className={styles.container}>
      <p className={`${styles.statusText} ${statusClass}`}>
        {OrderStatusMessage}
      </p>
    </div>
  );
}

export default OrderStatus;
