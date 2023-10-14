import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "age must be atleast 18" })
    .min(18)
    .max(99),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  //   initialize with mull or causes problems.
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          autoFocus
          className="form-control"
          id="name"
          placeholder="Enter name"
          {...register("name")}
          type="text"
        />
        {errors.name && (
          <p className="text-danger mt-2">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Age
        </label>
        <input
          className="form-control"
          id="age"
          placeholder="Enter age"
          {...register("age", { valueAsNumber: true })}
          type="number"
        />
        {errors.age && <p className="text-danger mt-2">{errors.age.message}</p>}
      </div>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
