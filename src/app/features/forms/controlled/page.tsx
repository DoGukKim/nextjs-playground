import NormalForm from "./Form";
import NormalFormWithObject from "./FormWithObject";
import FormWithUseReducer from "./FormWithUseReducer";

const ControlledFormPage = () => {
  return (
    <div>
      <NormalForm />
      <div className="h-4" />
      <NormalFormWithObject />
      <div className="h-4" />
      <FormWithUseReducer />
    </div>
  );
};

export default ControlledFormPage;
