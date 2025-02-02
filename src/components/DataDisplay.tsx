interface DataDisplayProps {
  label: string;
  value: string | number;
}

const DataDisplay = ({ label, value }: DataDisplayProps) => {
  return (
    <div className="data-card">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
      <p className="mono-text">{value}</p>
    </div>
  );
};

export default DataDisplay;