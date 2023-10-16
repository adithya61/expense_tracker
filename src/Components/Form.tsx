import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "age must be at least 18" })
    .min(18)
    .max(99),
  test: z.enum(["one", "two"]),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  // initialize with  null or cause problems.
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
        <input title="name" id="name" {...register("name")} type="text" />
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
          {...register("age", { valueAsNumber: true })}
          type="number"
        />
        {errors.age && <p className="text-danger mt-2">{errors.age.message}</p>}
      </div>
      <select id="test" {...register("test", { required: true })}>
        <option value=""></option>
        <option value="one">one</option>
        <option value="two">two</option>
      </select>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
