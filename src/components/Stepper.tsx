import "../App.css";

interface ISteps {
  step: number;
  title: string;
}

interface IStepper {
  currentStep: number;
  steps: ISteps[];
}

const Stepper = ({ steps, currentStep }: IStepper) => {
  return (
    <aside className="bg-sidebar-image-mobile min-h-[172px] bg-primary-purplish-blue bg-cover bg-no-repeat lg:bg-sidebar-image-desktop">
      <nav>
        <ol className="flex justify-center pt-8 gap-6 lg:flex-col lg:w-60 lg:mx-autor">
          {steps.map((step) => {
            const customStepStyle =
              currentStep === step.step
                ? "selectedStepperBg text-primary-marine-blue border-primary-light-blue"
                : "text-white";
            return (
              <li className="flex gap-4 lg:ml-8 items-center" key={step.step}>
                <div
                  className={`px-3 py-2 border border-white inline-flex rounded-full leading-none font-medium w-min h-min transition-colors duration-[400ms] ${customStepStyle}`}
                >
                  {step.step}
                </div>
                <span className="hidden lg:inline text-white uppercase">
                  <span className="font-bold">{step.title}</span>
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
