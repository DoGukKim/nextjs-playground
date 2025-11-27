import NormalForm from "./NormalForm";
import NormalFormWithObject from "./NormalFormWithObject";

const ControlledFormPage = () => {
  return (
    <div>
      <NormalForm />
      <div className="h-4" />
      <NormalFormWithObject />
      <div className="h-4" />
    </div>
  );
};

export default ControlledFormPage;
