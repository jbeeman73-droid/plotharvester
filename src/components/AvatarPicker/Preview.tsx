type Props = {
  image: string;
  bgColor: string;
};

export default function Preview({ image, bgColor }: Props) {
  return (
    <div
      style={{
        width: 120,
        height: 120,
        borderRadius: "5%",
        background: bgColor,
        padding: 10,
        overflow: "hidden",
        marginTop: 20,
      }}
    >
      <img
        src={image}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}