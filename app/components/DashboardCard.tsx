type Props = {
  title: string;
  amount: string;
};

export default function DashboardCard({
  title,
  amount,
}: Props) {
  return (
    <div className="bg-[#111827] border border-gray-800 p-5 rounded-2xl shadow-lg">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-3">
        {amount}
      </h2>

    </div>
  );
}