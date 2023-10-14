import { Updater } from "use-immer";

interface Props {
  setSelected: Updater<any>;

  category: "category";
  categories: string[];
}

function Select({ setSelected, category, categories }: Props) {
  return (
    <select
      title="category"
      className="form-select mb-5 w-25"
      onChange={(e) => {
        setSelected((draft: { [x: string]: string }) => {
          draft[category] = e.target.value;
        });
      }}
    >
      {categories.map((category) => (
        <option key={category}>{category}</option>
      ))}
    </select>
  );
}

export default Select;
