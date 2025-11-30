"use server";

export const formAction = async (formData: FormData) => {
  console.log(formData.get("username"));
};
