import React, { FormEvent } from "react";
import { useImmer } from "use-immer";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import Table from "./Table";
import { formValues } from "../utils/type";

interface Items {
  id: number;
  description: string;
  amount: number | string;
  category: string;
}

const ExpenseTracker = () => {
  const categories = [
    "All Categories",
    "Groceries",
    "Utilities",
    "Entertainment",
  ];

  const {
    register,
    formState: { errors, isValid },
  } = useForm<formValues>({ mode: "all" });

  const [expenses, setExpenses] = useImmer<Items[]>([
    {
      id: 0,
      description: "Milk",
      amount: "10",
      category: "Groceries",
    },
  ]);

  const [selected, setSelected] = useImmer<Items>({
    id: 1000,
    description: "",
    amount: 0,
    category: "All Categories",
  });

  const [filterCategory, setFilterCategory] = useImmer({
    category: "All Categories",
  });

  const submitExpense = (event: FormEvent) => {
    event.preventDefault();
    const obj = {
      ...selected,
      id: expenses.length,
    };
    setExpenses((draft) => {
      draft.push(obj);
    });
  };

  const removeExpense = (id: number) => {
    setExpenses((draft) => draft.filter((item) => item.id !== id));
  };

  return (
    <div>
      <form onSubmit={submitExpense}>
        <Input
          register={register}
          errors={errors}
          setSelected={setSelected}
          field="description"
          type={"text"}
        />
        <Input
          register={register}
          errors={errors}
          setSelected={setSelected}
          field="amount"
          type={"number"}
        />
        {/* Drop Down */}
        <Select
          setSelected={setSelected}
          category="category"
          categories={categories}
        />
        <button type="submit" disabled={isValid} className="btn btn-primary">
          Submit
        </button>
        <p>
          {selected.category} {selected.description} {selected.amount}
        </p>
      </form>
      <main>
        <Select
          setSelected={setFilterCategory}
          category="category"
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
