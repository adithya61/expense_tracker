import { Updater } from "use-immer";
import { Items } from "../utils/type";

interface Props {
  selected: Items;
  setSelected: Updater<any>;

  category: "category";
  categories: string[];
}

function Select({ selected, setSelected, category, categories }: Props) {
  return (
    <select
      value={selected.category}
      title="category"
      className="form-select mb-5 w-25"
      onChange={(e) => {
        setSelected((draft: { [x: string]: string }) => {
          draft[category] = e.target.value;
        });
      }}
    >
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default Select;
