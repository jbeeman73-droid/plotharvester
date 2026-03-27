import { useState } from "react";
import Preview from "./Preview";


export default function Picker({ onSelect }: { onSelect: (value: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [bgColor,] = useState("#7979796b");

  // Dynamically import all icons in the folder
const icons = import.meta.glob("./icons/*.{png,jpg,jpeg,svg}", {
  eager: true,
}) as Record<string, { default: string }>;

  const iconList = Object.values(icons).map((i) => i.default);
  return (
    <>
      <h2>Select an Avatar</h2>

      <div style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: 10, maxWidth: 400, margin: "40px auto", border: "1px solid #ffffff", background: "#47474771" }}>
      
         <div style={{ padding: 20, display: "flex", flexDirection: "row", alignItems: "center", height: "225px" }}>
           <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {iconList.map((src) => (
              <img
                key={src}
                src={src}
                width={48}
                height={48}
                className={"avatar-img" + (selected === src ? " selected" : "")}
                onClick={() => setSelected(src)}
              />
            ))}
          <button className="button1" onClick={() => selected && onSelect(selected)}>Select Avatar</button></div>
      
      <div>
          {selected && (
            <>
             
              <Preview image={selected} bgColor={bgColor} />
            </>
          )}

        </div>
       </div>
       
    </div>


      {/* --- Page-specific stylesheet below --- */}


      <style>{`
        .avatar-img {
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #ccc;
          transition: transform 0.18s cubic-bezier(.4,1.5,.5,1), box-shadow 0.18s;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .avatar-img.selected {
          border: 3px solid #4caf50;
        }
        .avatar-img:hover {
          transform: translateY(-6px) scale(1.08);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }
        .avatar-img:active {
          transform: translateY(2px) scale(0.98);
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .button1 {
          margin: 20px auto 0 auto;
          box-shadow: 0 4px 8px rgba(0,0,0,0.4);
          display: block;
          background: #8a8a8a;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.4);
          border: 1px solid #ffffff;
          border-radius: 12px;
          padding: 5px 6px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: ease-in-out 0.2s;
        }
        .button1:hover {
          background: #388e3c;
          animation: ease-in-out 0.2s;
        }
        /* Add more custom styles for this page below */
        .container2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 24px 0;
          padding: 16px;
        }
      `}</style>
    </>
  );
}