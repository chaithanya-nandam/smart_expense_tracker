type Expense = {
  title: string;
  amount: string;
  date: string;
};

type Props = {
  expenses: Expense[];
};

export default function RecentTransactions({
  expenses,
}: Props) {
  return (
    <div className="bg-[#111827] p-6 rounded-2xl shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {expenses.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-700 pb-3"
          >
            <div>
              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {item.date}
              </p>
            </div>

            <p className="text-red-400 font-bold">
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}