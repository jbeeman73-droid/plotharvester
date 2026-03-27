type Props = {
  onSelect: (dataUrl: string) => void;
};

export default function Uploader({ onSelect }: Props) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => onSelect(reader.result as string);
        reader.readAsDataURL(file);
      }}
    />
  );
}