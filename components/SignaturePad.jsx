"use client";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({ setSignature }) {
  const sigCanvas = useRef(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL();
      setSignature(dataURL);
    }
  };

  return (
    <div className="border p-4 mt-4">
      <h3 className="text-lg font-semibold text-black">Tanda Tangan</h3>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ className: "border w-full h-40 bg-white" }}
      />
      <div className="flex justify-between mt-2">
        <button onClick={clearSignature} className="bg-red-500 text-white px-4 py-2 rounded">
          Hapus
        </button>
        <button onClick={saveSignature} className="bg-blue-500 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </div>
    </div>
  );
}
