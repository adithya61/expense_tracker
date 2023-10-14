import Delete from "./Delete";

interface Props {
  expenses: {
    id: number;
    description: string;
    amount: number | string;
    category: string;
  }[];
  removeExpense: (id: number) => void;

  selectedCategory: string;
}
const Table = ({ expenses, removeExpense, selectedCategory }: Props) => {
  const filteredExpenses =
    selectedCategory != "All Categories"
      ? expenses.filter((exp) => exp.category === selectedCategory)
      : expenses;

  const calculateSum = () => {
    let sum: number = 0;

    filteredExpenses.map((exp) => {
      sum += Number(exp.amount);
    });
    return sum;
  };

  return (
    <div>
      {expenses.length > 0 ? (
        <table className="table w-50">
          <thead className="thead-dark">
            <tr>
              {Object.keys(expenses[0]).map((exp) => (
                <th scope-="col" key={exp}>
                  {exp}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                {Object.entries(expense).map(([key, value]) => (
                  <td key={key}>
                    {key == "amount" ? "₹" + value + ".00" : value}
                  </td>
                ))}
                <td>
                  <Delete removeExpense={removeExpense} id={expense.id} />
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>Total</td>
              <td>{calculateSum()}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Table;
