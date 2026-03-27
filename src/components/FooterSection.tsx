export default function FooterSection() {
  return (
    <div
      style={{
        width: "100%",
        padding: "16px",
        marginTop: "40px",
        textAlign: "center",
        color: "#aaa",
        fontSize: "14px",
        opacity: 0.8,
      }}
    >
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} PlotHarvester</p>
    </div>
  );
}