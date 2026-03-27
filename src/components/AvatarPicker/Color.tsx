type Props = {
  value: string;
  onChange: (color: string) => void;
};

export default function Color({ value, onChange }: Props) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ marginTop: 10 }}
    />
  );
}