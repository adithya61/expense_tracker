import { Updater } from "use-immer";

interface Props {
  setSelected: Updater<{
    id: number;
    description: string;
    amount: number | string;
    category: string;
  }>;
  field: "description" | "amount" | "category";
  type: string;
}

function Input({ setSelected, field, type }: Props) {
  return (
    <div className="mb-5 w-25">
      <label htmlFor={field} className="form-label">
        {field}
      </label>
      <input
        onChange={(e) => {
          setSelected((draft) => {
            draft[field] = e.target.value;
          });
        }}
        placeholder={`Add ${field}`}
        id={field}
        type={type}
        className="form-control"
      />
    </div>
  );
}

export default Input;
