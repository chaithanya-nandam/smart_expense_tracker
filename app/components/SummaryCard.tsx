type Props = {
  title: string;
  value: string;
};

export default function SummaryCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-[#111827] p-6 rounded-2xl shadow-lg">
      <h2 className="text-gray-400 text-lg">
        {title}
      </h2>

      <p className="text-3xl font-bold text-white mt-3">
        {value}
      </p>
    </div>
  );
}