interface Props {
  removeExpense: (id: number) => void;
  id: number;
}

const Delete = ({ removeExpense, id }: Props) => {
  return (
    <div>
      <button
        onClick={() => removeExpense(id)}
        className="btn btn-outline-danger"
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
