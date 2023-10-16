import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  field: "description" | "amount";
  type: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

function Input({ field, type, register, errors }: Props) {
  const validationObj = {
    required: true,
    // ...(field == "description" && { minLength: 3 }),
    ...(field == "amount" && { valueAsNumber: true }),
  };

  return (
    <div className="mb-3 w-50">
      <label htmlFor={field} className="form-label">
        {field}
      </label>
      <input
        {...register(field, validationObj)}
        placeholder={`Add ${field}`}
        id={field}
        type={type}
        className="form-control"
      />
      {errors[field] && (
        <span className="text text-danger">
          {errors?.[field]?.message?.toString()}
        </span>
      )}
    </div>
  );
}

export default Input;
