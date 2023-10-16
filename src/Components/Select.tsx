import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ChangeEvent } from "react";

interface Props {
  errors?: FieldErrors<any>;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  register?: UseFormRegister<any>;
  categories: string[];
  defaultSelect: string;
}

function Select({ defaultSelect, errors, register, categories }: Props) {
  const validObj = {
    ...register?.("category"),
  };

  return (
    <div>
      <select id="category" {...validObj} className="form-select mb-3 w-50">
        <option value={defaultSelect}>{defaultSelect}</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      <p className="text text-danger">
        {errors?.category && (
          <span>{errors?.category?.message?.toString()}</span>
        )}
      </p>
    </div>
  );
}

export default Select;
