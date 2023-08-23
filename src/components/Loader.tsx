import React from "react";

const styles = {
  container: "w-full h-full flex justify-center items-center",
  spinner:
    "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
  hiddenText:
    "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]",
};

function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} role="status">
        <span className={styles.hiddenText}>Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
