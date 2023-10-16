import { ChangeEvent, useEffect } from "react";
import { useImmer } from "use-immer";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import Table from "./Table";
import { Items, categories } from "../utils/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const schema = z.object({
  description: z
    .string()
    .min(3, { message: "name must be at least 3 characters" }),
  amount: z.number().min(1).max(100_000),
  category: z.enum(["Groceries", "Utilities", "Entertainment"]),
});

type Data = z.infer<typeof schema>;

const ExpenseTracker = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
    formState,
  } = useForm<Data>({ mode: "all", resolver: zodResolver(schema) });

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [reset, isSubmitSuccessful]);

  const [expenses, setExpenses] = useImmer<Items[]>([
    {
      id: 0,
      description: "Milk",
      amount: "10",
      category: "Groceries",
    },
  ]);

  //   const [selected, setSelected] = useImmer(initialValues);

  const [filterCategory, setFilterCategory] = useImmer({
    category: "All Categories",
  });

  const handleSelectForm = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
  };

  const handleSelectFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    setFilterCategory((draft) => {
      draft.category = event.target.value;
    });
  };

  const removeExpense = (id: number) => {
    setExpenses((draft) => draft.filter((item) => item.id !== id));
  };

  const submitExpense = ({ description, amount, category }: FieldValues) => {
    const obj = {
      id: expenses.length,
      description,
      amount,
      category,
    } as Items;
    setExpenses((draft) => {
      draft.push(obj);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitExpense)}>
        <Input
          register={register}
          errors={errors}
          field="description"
          type={"text"}
        />
        <Input
          register={register}
          errors={errors}
          field="amount"
          type={"number"}
        />
        {/* Drop Down Form */}
        <Select
          errors={errors}
          defaultSelect={""}
          register={register}
          handleSelect={handleSelectForm}
          categories={categories}
        />
        <button disabled={!isValid} type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
        <p></p>
      </form>
      <main>
        {/* DropDown filter */}
        <Select
          defaultSelect={"All Categories"}
          handleSelect={handleSelectFilter}
          categories={categories}
        />
        <Table
          expenses={expenses}
          removeExpense={removeExpense}
          selectedCategory={filterCategory.category}
        />
      </main>
    </div>
  );
};

export default ExpenseTracker;
