import React from "react";
import { IStepper } from "../types";

const styles = {
  container:
    "bg-sidebar-image-mobile min-h-[172px] bg-primary-purplish-blue bg-cover bg-no-repeat lg:bg-sidebar-image-desktop",
  stepsList: "flex justify-center pt-8 gap-6 lg:flex-col lg:w-60 lg:mx-auto",
  stepItem: "flex gap-4 lg:ml-8 items-center",
  stepNumber:
    "px-3 py-2 border border-white inline-flex rounded-full leading-none font-medium w-min h-min transition-colors duration-[400ms]",
  selectedStepBg:
    "selectedStepperBg text-primary-marine-blue border-primary-light-blue",
  stepTitle: "hidden lg:inline text-white uppercase",
  stepTitleBold: "font-bold",
};

const Stepper = ({ steps, currentStep }: IStepper) => {
  return (
    <aside className={styles.container}>
      <nav>
        <ol className={styles.stepsList}>
          {steps.map((step) => {
            const customStepStyle =
              currentStep === step.step
                ? `${styles.selectedStepBg}`
                : "text-white";
            return (
              <li className={styles.stepItem} key={step.step}>
                <div className={`${styles.stepNumber} ${customStepStyle}`}>
                  {step.step}
                </div>
                <span className={styles.stepTitle}>
                  <span className={styles.stepTitleBold}>{step.title}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
};

export default Stepper;
