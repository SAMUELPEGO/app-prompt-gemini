"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonToHome from "@/app/components/ButtonToHome";


export default function Home() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const stylesTextArea =
    { resize: "none", height: 80, border: "none", outline: active ? "none" : "none", flexGrow: "1", padding: 10 }
  const btnSubmit =
    { flexGrow: ".2", maxWidth: 50, height: 50, borderRadius: "100%", border: "none", background: "#ccc" }

  async function handleOnClick(e) {
    try {
      e.preventDefault();
      const value = inputValue;
      setLoading(true)
      const req = await fetch(`/api`, { method: "POST", body: JSON.stringify({ prompt: data + value }), headers: { "Content-Type": "application/json" } });
      const res = await req.json()
      setData(prev => prev + "<br>" + res.result + "<br>" + "-------------------------------------------" + "<br>")
      // `<p style= "background-color: #cbc; padding: 20px;width: max-content; font-weight: 900;border-radius: 20px;text-align: center">${value}</p>`
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
      alert(error.message)

    }
  };
  useEffect(() => {
    setData(prev => prev.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"))


  }, [data])

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}><ButtonToHome /></div>
      <div style={{ width: "80%", height: "60vh", margin: "0 auto", background: "#ddd", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", overflowY: !loading ? "auto" : "hidden", position: "relative" }}>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: "1.1rem", filter: !loading ? "none" : "blur(5px)" }} dangerouslySetInnerHTML={{ __html: data }}></pre>
        <Image src="/watch-loader.svg" alt="" width={100} height={100} style={{ display: !loading ? "none" : "inline", position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
      </div>

      <div style={{ borderRadius: "20px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "4px 4px 10px 4px #ccc", width: "80%", background: "#f8f4f2", padding: "20px", position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
        <textarea style={stylesTextArea} onChange={(e) => setInputValue(e.currentTarget.value)} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} />
        <input type="submit" value={"send"} style={btnSubmit} onClick={(e) => handleOnClick(e)} />
      </div >
    </>
  );
}
