import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Updater } from "use-immer";
import { formValues } from "../utils/type";
import { Items } from "../utils/type";

interface Props {
  setSelected: Updater<{
    id: number;
    description: string;
    amount: number | string;
    category: string;
  }>;
  field: "description" | "amount";
  type: string;
  register: UseFormRegister<formValues>;
  errors: FieldErrors<formValues>;
  selected: Items;
}

function Input({
  setSelected,
  field,
  type,
  register,
  errors,
  selected,
}: Props) {
  const validationObj = {
    required: true,
    ...(field == "description" && { minLength: 3 }),
  };

  return (
    <div className="mb-5 w-25">
      <label htmlFor={field} className="form-label">
        {field}
      </label>
      <input
        {...register(field, validationObj)}
        onChange={(e) => {
          setSelected((draft) => {
            draft[field] = e.target.value;
          });
        }}
        placeholder={`Add ${field}`}
        id={field}
        type={type}
        className="form-control"
        value={selected[field]}
      />
      {errors[field]?.type === "required" && (
        <span className="text text-danger">This field is required</span>
      )}
      {errors[field]?.type === "minLength" && (
        <span className="text text-danger">Enter at least 3 characters</span>
      )}
    </div>
  );
}

export default Input;
