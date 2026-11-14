"use client";
import Link from "next/link";
import { useState } from "react";
import SignaturePad from "@/components/SignaturePad";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function FormPerpindahan() {
  const [formData, setFormData] = useState({
    nomorKK: "",
    namaPemohon: "",
    nik: "",
    jenisPemohon: "",
    alamatAsal: "",
    klasifikasiKepindahan: "",
    alamatPindah: "",
    alasanPindah: "",
    jenisKepindahan: "",
    keluargaTidakPindah: "",
    keluargaPindah: "",
    daftarKeluargaPindah: [{ nama: "", nik: "", shdk: "" }],
    namaSponsor: "",
    typeSponsor: "",
    alamatSponsor: "",
    nomorITAS_ITAP: "",
    tanggalITAS_ITAP: "",
    negaraTujuan: "",
    alamatTujuan: "",
    penanggungJawab: "",
    rencanaPindah: "",
    noHandphone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Fungsi untuk menangani perubahan input daftar anggota keluarga yang pindah
  const handleKeluargaChange = (index, e) => {
    const { name, value } = e.target;
    const newKeluarga = [...formData.daftarKeluargaPindah];
    newKeluarga[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      daftarKeluargaPindah: newKeluarga,
    }));
  };

  // Fungsi untuk menambah baris baru dalam daftar keluarga yang pindah
  const addKeluargaRow = () => {
    setFormData((prev) => ({
      ...prev,
      daftarKeluargaPindah: [
        ...prev.daftarKeluargaPindah,
        { nama: "", nik: "", shdk: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "nomorKK",
      "namaPemohon",
      "nik",
      "jenisPemohon",
      "alamatAsal",
      "alamatPindah",
      "alasanPindah",
      "jenisKepindahan",
      "noHandphone",
      "email",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Field ${field} wajib diisi!`);
        return;
      }
    }
    try {
      await addDoc(collection(db, "perpindahan"), formData);
      alert("Data berhasil disimpan!");
      setFormData({
        nomorKK: "",
        namaPemohon: "",
        nik: "",
        jenisPemohon: "",
        alamatAsal: "",
        klasifikasiKepindahan: "",
        alamatPindah: "",
        alasanPindah: "",
        jenisKepindahan: "",
        keluargaTidakPindah: "",
        keluargaPindah: "",
        namaSponsor: "",
        typeSponsor: "",
        alamatSponsor: "",
        nomorITAS_ITAP: "",
        tanggalITAS_ITAP: "",
        negaraTujuan: "",
        alamatTujuan: "",
        penanggungJawab: "",
        rencanaPindah: "",
        noHandphone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const bagian1 = document.getElementById("bagian-1");
    const bagian2 = document.getElementById("bagian-2");
    const bagian3 = document.getElementById("bagian-3");

    if (!bagian1 || !bagian2 || !bagian3) return;

    window.scrollTo(0, 0);

    // Bagian 1
    const canvas1 = await html2canvas(bagian1, { scale: 2 });
    const imgData1 = canvas1.toDataURL("image/png");
    pdf.addImage(
      imgData1,
      "PNG",
      10,
      10,
      190,
      (canvas1.height * 190) / canvas1.width
    );

    // Bagian 2
    pdf.addPage();
    const canvas2 = await html2canvas(bagian2, { scale: 2 });
    const imgData2 = canvas2.toDataURL("image/png");
    pdf.addImage(
      imgData2,
      "PNG",
      10,
      10,
      190,
      (canvas2.height * 190) / canvas2.width
    );

    // Bagian 3
    pdf.addPage();
    const canvas3 = await html2canvas(bagian3, { scale: 2 });
    const imgData3 = canvas3.toDataURL("image/png");
    pdf.addImage(
      imgData3,
      "PNG",
      10,
      10,
      190,
      (canvas3.height * 190) / canvas3.width
    );

    // Tambahkan tanda tangan di halaman terakhir
    if (signature) {
      pdf.addImage(
        signature,
        "PNG",
        10,
        (canvas3.height * 190) / canvas3.width + 20,
        50,
        20
      );
    }

    pdf.save("Formulir_Pindah.pdf");
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

        <h2 className="text-black font-bold text-center text-xl mb-4">
          FORMULIR PENDAFTARAN PERPINDAHAN PENDUDUK
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nomor KK */}
          <div id="bagian-1" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Nomor KK
            </label>
            <input
              type="text"
              name="nomorKK"
              value={formData.nomorKK}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
            <p className="text-black text-xs">
              Silahkan dilihat pada KARTU KELUARGA PEMOHON
            </p>
          </div>

          {/* Nama Pemohon */}
          <div id="bagian-2" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Nama Lengkap Pemohon
            </label>
            <input
              type="text"
              name="namaPemohon"
              value={formData.namaPemohon}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
            <p className="text-black text-xs">
              Pastikan Nama Lengkap pemohon sudah sesuai dengan KTPel dan KK
              anda
            </p>
          </div>

          {/* NIK */}
          <div id="bagian-3" className="form-section">
            <label className="block font-semibold text-black text-lg">
              NIK
            </label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
            <p className="text-black text-xs">
              Pastikan Nik pemohon sudah sesuai dengan KTPel dan KK anda
            </p>
          </div>

          {/* Jenis Pemohon */}
          <div id="bagian-4" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Jenis Pemohon
            </label>
            <div>
              <select
                name="jenisPemohon"
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Pilih Jenis Pemohon</option>
                <option value="Surat Keterangan Kependudukan">
                  Surat Keterangan Kependudukan
                </option>
                <option value="Surat Keterangan Pindah">
                  Surat Keterangan Pindah
                </option>
                <option value="SPKLN">
                  Surat Keterangan Pindah Luar Negeri (SPKLN)
                </option>
                <option value="SKTT">
                  Surat Keterangan Tempat Tinggal (SKTT) Bagi Orang Asing
                  Tinggal Terbatas
                </option>
              </select>
              <p className="text-black text-xs">Pilih jenis pemohon</p>
            </div>
          </div>

          {/* Alamat Asal */}
          <div id="bagian-5" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Alamat Asal
            </label>
            <input
              type="text"
              name="alamatAsal"
              value={formData.alamatAsal}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Klasifikasi Kepindahan */}
          <div>
            <label className="block font-semibold text-black text-lg">
              Klasifikasi Kepindahan
            </label>
            <div id="bagian-6" className="form-section">
              <select
                name="klasifikasiKepindahan"
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Pilih Jenis Klasifikasi Kepindahan</option>
                <option value="Satu Desa">
                  Dalam satu desa/ Kelurahan atau yang disebut dengan nama lain
                </option>
                <option value="Antar Desa">
                  Antar desa/kelurahan atau yang disebut dengan nama lain dalam
                  satu kecamatan
                </option>
                <option value="Antar Kecamatan">
                  Antar kecamatan atau yang disebut dengan nama lain dalam satu
                  kabupaten/kota
                </option>
                <option value="Antar Provinsi">Antar Provinsi</option>
              </select>
            </div>
          </div>

          {/* Alamat Pindah */}
          <div id="bagian-7" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Alamat Pindah
            </label>
            <input
              type="text"
              name="alamatPindah"
              value={formData.alamatPindah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Alasan Pindah */}
          <div>
            <label className="block font-semibold text-black text-lg">
              Alasan Kepindahan
            </label>
            <div id="bagian-8" className="form-section">
              <select
                name="alasanPindah"
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Pilih Alasan Kepindahan</option>
                <option value="Pekerjaan">Pekerjaan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Keamanan">Keamanan</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Perumahan">Perumahan</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          {/* Jenis Pindah */}
          <div>
            <label className="block font-semibold text-black text-lg">
              Jenis Kepindahan
            </label>
            <div id="bagian-9" className="form-section">
              <select
                name="jenisKepindahan"
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Pilih Jenis Kepindahan</option>
                <option value="Kepala Keluarga">Kepala Keluarga</option>
                <option value="Kepala Keluarga Dan Seluruh Anggota Keluarga">
                  Kepala Keluarga Dan Seluruh Anggota Keluarga
                </option>
                <option value="Kepala Keluarga Dan Sebagian Anggota Keluarga">
                  Kepala Keluarga Dan Sebagian Anggota Keluarga
                </option>
                <option value="Anggota Keluarga">Anggota Keluarga</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          {/* Anggota Keluarga Tidak Pindah */}
          <div>
            <label className="block font-semibold text-black text-lg">
              Anggota Keluarga Tidak Pindah
            </label>
            <div id="bagian-10" className="form-section">
              <select
                name="keluargaTidakPindah"
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Pilih Anggota Keluarga Tidak Pindah</option>
                <option value="Numpang KK">Numpang KK</option>
                <option value="Membuat KK Baru">Membuat KK Baru</option>
              </select>
            </div>
          </div>

          {/* Anggota Keluarga Yang Pindah */}
          <div>
            <label className="block font-semibold text-black text-lg">
              Anggota Keluarga Yang Pindah
            </label>
            <div id="bagian-11" className="form-section">
              <select
                name="keluargaPindah"
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Pilih Anggota Keluarga Yang Pindah</option>
                <option value="Numpang KK">Numpang KK</option>
                <option value="Membuat KK Baru">Membuat KK Baru</option>
              </select>
            </div>
          </div>

          {/* Daftar Anggota Keluarga yang Pindah */}
          <div id="bagian-12" className="form-section">
            <h3 className="font-semibold text-lg text-black">
              Daftar Anggota Keluarga yang Pindah
            </h3>
            <div className="space-y-2">
              {formData.daftarKeluargaPindah.map((keluarga, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="nama"
                    placeholder="Nama Lengkap"
                    value={keluarga.nama}
                    onChange={(e) => handleKeluargaChange(index, e)}
                    className="w-full p-2 border rounded text-black"
                  />
                  <input
                    type="text"
                    name="nik"
                    placeholder="NIK"
                    value={keluarga.nik}
                    onChange={(e) => handleKeluargaChange(index, e)}
                    className="w-full p-2 border rounded text-black"
                  />
                  <input
                    type="text"
                    name="shdk"
                    placeholder="SHDK"
                    value={keluarga.shdk}
                    onChange={(e) => handleKeluargaChange(index, e)}
                    className="w-full p-2 border rounded text-black"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addKeluargaRow}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              + Tambah Anggota Keluarga
            </button>
          </div>

          <br />
          <br />
          <br />
          <br />
          <p className="text-black text-sm">
            {" "}
            Diisi oleh Penduduk (Orang Asing) pemegang ITAS yang Mengajukan SKTT
            dan OA Pemegang SKTT dan OA Pemegang ITAP yang Mengajukan Surat
            Keterangan Kependudukan Lainnya
          </p>

          {/* Nama Sponsor */}
          <div id="bagian-13" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Nama Sponsor
            </label>
            <input
              type="text"
              name="namaSponsor"
              value={formData.namaSponsor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Type Sponsor */}
          <div>
            <label className="block font-semibold text-black text-lg">
              Type Sponsor
            </label>
            <div id="bagian-14" className="form-section">
              <select
                name="typeSponsor"
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Pilih Jenis Type Sponsor</option>
                <option value="Organisasi Internasional">
                  Organisasi Internasional
                </option>
                <option value="Perorangan">Perorangan</option>
                <option value="Pemerintah">Pemerintah</option>
                <option value="Tanpa Sponsor">Tanpa Sponsor</option>
                <option value="Perusahaan">Perusahaan</option>
              </select>
            </div>
          </div>

          {/* Alamat Sponsor */}
          <div id="bagian-15" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Alamat Sponsor
            </label>
            <input
              type="text"
              name="alamatSponsor"
              value={formData.alamatSponsor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Nomor ITAS/ITAP */}
          <div id="bagian-16" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Nomor ITAS / ITAP
            </label>
            <input
              type="text"
              name="nomorITAS_ITAP"
              value={formData.nomorITAS_ITAP}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Tanggal Berlaku ITAS/ITAP */}
          <div id="bagian-17" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Tanggal Berlaku ITAS / ITAP
            </label>
            <input
              type="text"
              name="tanggalITAS_ITAP"
              value={formData.tanggalITAS_ITAP}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <p className="text-black text-sm">
            {" "}
            Diisi oleh Penduduk Yang Mengajukan Surat Keterangan Pindah Luar
            Negeri
          </p>

          {/* Negara Tujuan */}
          <div id="bagian-18" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Negara Tujuan
            </label>
            <input
              type="text"
              name="negaraTujuan"
              value={formData.negaraTujuan}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Alamat Tujuan */}
          <div id="bagian-19" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Alamat Tujuan
            </label>
            <input
              type="text"
              name="alamatTujuan"
              value={formData.alamatTujuan}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Penanggung Jawab */}
          <div id="bagian-20" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Penanggung Jawab
            </label>
            <input
              type="text"
              name="penanggungJawab"
              value={formData.penanggungJawab}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Rencana Pindah */}
          <div id="bagian-21" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Rencana Pindah Tanggal
            </label>
            <input
              type="date"
              name="rencanaPindah"
              value={formData.rencanaPindah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* No Handphone */}
          <div id="bagian-22" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Nomor Handphone
            </label>
            <input
              type="text"
              name="noHandphone"
              value={formData.noHandphone}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Email */}
          <div id="bagian-23" className="form-section">
            <label className="block font-semibold text-black text-lg">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div id="bagian-24" className="form-section">
            <SignaturePad setSignature={setSignature} />
            {signature && (
              <img src={signature} alt="Tanda Tangan" className="mt-4 border" />
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-lg"
            >
              Submit
            </button>
          </div>

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
