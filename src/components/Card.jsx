const Card = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center hover:scale-105 transition">
      <h3 className="text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
    </div>
  );
};

export default Card;
