import z, { flattenError } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다"),
});

export type FormState = {
  name?: string;
  errors?: {
    name?: string[];
  };
};

export const formAction = async (
  _: FormState,
  formData: FormData
): Promise<FormState> => {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    const flattened = flattenError(result.error);
    return { errors: flattened.fieldErrors };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { name: result.data.name };
};
