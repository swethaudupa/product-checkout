interface ISteps {
  step: number;
  title: string;
}

interface IStepperControl {
  handleClick: (direction: string) => void;
  currentStep: number;
  steps: ISteps[];
}

function StepperControl(props: IStepperControl) {
  const { handleClick, currentStep, steps } = props;
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      <button
        className={`rounded bg-transparent text-neutral-cool-gray px-5 py-2 font-semibold ${
          currentStep === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={() => handleClick("prev")}
      >
        Go Back
      </button>

      {currentStep !== steps.length && (
        <button
          className="cursor-pointer rounded-lg bg-primary-marine-blue hover:opacity-70 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out"
          onClick={() => handleClick("next")}
        >
          {currentStep === steps.length - 1 ? "Confirm" : "Next"}
        </button>
      )}
    </div>
  );
}
export default StepperControl;
