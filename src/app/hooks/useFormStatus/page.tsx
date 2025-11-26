import Button from "./Button";

const UseFormStatusPage = () => {
  const handleSubmit = async () => {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <form method="POST" action={handleSubmit}>
        <input type="text" name="name" />
        <Button />
      </form>
    </div>
  );
};

export default UseFormStatusPage;
