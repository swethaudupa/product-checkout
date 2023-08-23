import React from "react";
import { IStepperControl } from "../types";

const styles = {
  container: "container mt-4 mb-8 flex justify-around",
  backButton:
    "rounded bg-transparent text-neutral-cool-gray px-5 py-2 font-semibold",
  backButtonDisabled: "cursor-not-allowed",
  nextButton:
    "cursor-pointer rounded-lg bg-primary-marine-blue hover:opacity-70 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out",
};

function StepperControl(props: IStepperControl) {
  const { handleClick, currentStep, steps } = props;
  return (
    <div className={styles.container}>
      <button
        className={`${styles.backButton} ${
          currentStep === 1 ? styles.backButtonDisabled : ""
        }`}
        onClick={() => handleClick("prev")}
      >
        Go Back
      </button>

      {currentStep !== steps.length && (
        <button
          className={styles.nextButton}
          onClick={() => handleClick("next")}
        >
          {currentStep === steps.length - 1 ? "Confirm" : "Next"}
        </button>
      )}
    </div>
  );
}
export default StepperControl;
