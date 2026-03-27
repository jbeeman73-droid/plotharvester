type Props = {
  image: string;
  onChange: (dataUrl: string) => void;
};

export default function Cropper({ image }: Props) {
  return (
    <div style={{ margin: "10px 0" }}>
      <p>Cropper coming soon…</p>
      <img src={image} alt="crop" style={{ width: 150 }} />
    </div>
  );
}