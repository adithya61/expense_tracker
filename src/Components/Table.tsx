import Delete from "./Delete";

interface Props {
  expenses: {
    id: number;
    description: string;
    amount: number | string;
    category: string;
  }[];
  removeExpense: (id: number) => void;
}
const Table = ({ expenses, removeExpense }: Props) => {
  return (
    <div>
      <table className="table w-50">
        <thead className="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              {Object.entries(expense).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
              <td>
                <Delete removeExpense={removeExpense} id={expense.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
