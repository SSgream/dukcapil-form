"use client";

import { useState } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import SignaturePad from "@/components/SignaturePad";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";

export default function FormPerubahan() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nik: "",
    nomorKK: "",
    email: "",
    noHandphone: "",
    perubahan: {
      pendidikan: false,
      pekerjaan: false,
      agama: false,
      lainnya: false,
    },
    detailPerubahan: {
      pendidikan: { semula: "", menjadi: "", dasar: "", tgl: "" },
      pekerjaan: { semula: "", menjadi: "", dasar: "", tgl: "" },
      agama: { semula: "", menjadi: "", dasar: "", tgl: "" },
      lainnya: { kategori: "", semula: "", menjadi: "", dasar: "", tgl: "" },
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        perubahan: { ...prev.perubahan, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDetailChange = (e, jenis) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      detailPerubahan: {
        ...prev.detailPerubahan,
        [jenis]: { ...prev.detailPerubahan[jenis], [name]: value },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "perubahanData"), formData);
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDownloadPDF = () => {
    const formElement = document.getElementById("formulir-pindah");

    if (!formElement) {
      console.error("Elemen formulir tidak ditemukan.");
      return;
    }

    window.scrollTo(0, 0); // Pastikan halaman di-scroll ke atas sebelum diambil gambarnya

    html2canvas(formElement, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        let imgWidth = 210; // Lebar PDF dalam mm (A4)
        let pageHeight = 297; // Tinggi halaman A4 dalam mm
        let imgHeight = (canvas.height * imgWidth) / canvas.width; // Sesuaikan tinggi gambar dengan proporsi

        let yPosition = 10; // Pastikan ada margin atas

        if (imgHeight <= pageHeight - 20) {
          // Jika muat dalam satu halaman
          pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
        } else {
          let remainingHeight = imgHeight;
          let yOffset = yPosition;

          while (remainingHeight > 0) {
            let partHeight =
              remainingHeight > pageHeight - 20
                ? pageHeight - 20
                : remainingHeight;
            pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, partHeight);
            remainingHeight -= pageHeight - 20;

            if (remainingHeight > 0) {
              pdf.addPage();
              yOffset = 10;
            }
          }
        }

        pdf.save("Formulir_Pindah.pdf");
      })
      .catch((error) => console.error("Gagal membuat PDF:", error));
  };

  const [signature, setSignature] = useState(null);

  return (
    <div className="text-black min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div
        id="formulir-pindah"
        className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg my-10"
      >
        <div className="flex items-center mb-4">
          <Link href="/">
            <div className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer">
              <img src="home.png" alt="Kembali" className="w-6 h-6 mr-2" />
              <span className="text-sm font-semibold">Kembali</span>
            </div>
          </Link>
        </div>
        <h2 className="font-bold text-center text-2xl mb-4">
          SURAT PERNYATAAN PERUBAHAN DATA KEPENDUDUKAN WARGA NEGARA INDONESIA
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Nama Lengkap"
            name="namaLengkap"
            value={formData.namaLengkap}
            onChange={handleChange}
          />
          <InputField
            label="NIK"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
          />
          <InputField
            label="Nomor KK"
            name="nomorKK"
            value={formData.nomorKK}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Nomor Handphone"
            name="noHandphone"
            value={formData.noHandphone}
            onChange={handleChange}
          />

          <div>
            <p className="font-semibold">Perubahan Data Kependudukan:</p>
            {["pendidikan", "pekerjaan", "agama", "lainnya"].map((jenis) => (
              <label key={jenis} className="block">
                <input
                  type="checkbox"
                  name={jenis}
                  checked={formData.perubahan[jenis]}
                  onChange={handleChange}
                />{" "}
                {jenis.charAt(0).toUpperCase() + jenis.slice(1)}
              </label>
            ))}
          </div>

          {Object.keys(formData.detailPerubahan).map(
            (jenis) =>
              formData.perubahan[jenis] && (
                <div key={jenis} className="border p-4 rounded-lg form-section">
                  <p className="font-semibold">
                    {jenis === "lainnya"
                      ? "Perubahan Lainnya"
                      : jenis.charAt(0).toUpperCase() + jenis.slice(1)}
                  </p>
                  {jenis === "lainnya" && (
                    <InputField
                      label="Sebutkan Perubahan"
                      name="kategori"
                      value={formData.detailPerubahan.lainnya.kategori}
                      onChange={(e) => handleDetailChange(e, jenis)}
                    />
                  )}
                  <InputField
                    label="Semula"
                    name="semula"
                    value={formData.detailPerubahan[jenis].semula}
                    onChange={(e) => handleDetailChange(e, jenis)}
                  />
                  <InputField
                    label="Menjadi"
                    name="menjadi"
                    value={formData.detailPerubahan[jenis].menjadi}
                    onChange={(e) => handleDetailChange(e, jenis)}
                  />
                  <InputField
                    label="Dasar Perubahan"
                    name="dasar"
                    value={formData.detailPerubahan[jenis].dasar}
                    onChange={(e) => handleDetailChange(e, jenis)}
                  />
                  <InputField
                    label="Tanggal"
                    name="tgl"
                    type="date"
                    value={formData.detailPerubahan[jenis].tgl}
                    onChange={(e) => handleDetailChange(e, jenis)}
                  />
                </div>
              )
          )}

          <div className="mt-6">
            <p className="text-justify">
              Demikian Surat Pernyataan ini saya buat dengan sebenarnya, apabila
              dalam keterangan yang saya berikan terdapat hal-hal yang tidak
              berdasarkan keadaan yang sebenarnya, saya bersedia dikenakan
              sanksi sesuai ketentuan peraturan perundang-undangan yang berlaku.
            </p>
          </div>

          <div className="form-section border p-4 rounded-lg text-center">
            <p className="font-semibold">Foto KTP-El</p>
            <input type="file" className="block mx-auto" />
          </div>

          <div id="bagian-24" className="form-section">
            <SignaturePad setSignature={setSignature} />
            {signature && (
              <img src={signature} alt="Tanda Tangan" className="mt-4 border" />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg"
          >
            Kirim
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Download PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded text-black"
      />
    </div>
  );
}
