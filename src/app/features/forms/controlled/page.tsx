import NormalForm from "./Form";
import NormalFormWithObject from "./FormWithObject";
import FormWithUseReducer from "./FormWithUseReducer";

const ControlledFormPage = () => {
  return (
    <div>
      <NormalForm />
      <NormalFormWithObject />
      <FormWithUseReducer />
    </div>
  );
};

export default ControlledFormPage;
