"use client";
import { useState } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import SignaturePad from "@/components/SignaturePad";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";

export default function FormKematian() {
  const [formData, setFormData] = useState({
    nikPelapor: "",
    nomorKKPelapor: "",
    namaPelapor: "",
    tempatTanggalLahirPelapor: "",
    pekerjaanPelapor: "",
    nomorTeleponPelapor: "",
    alamatPelapor: "",
    nikKematian: "",
    nomorKKKematian: "",
    namaLengkapKematian: "",
    tempatTanggalLahirKematian: "",
    tanggalKematian: "",
    pukulKematian: "",
    sebabKematian: "",
    tempatKematian: "",
    yangMenerangkan: "",
    nomorTeleponKeluarga: "",
    emailKeluarga: "",
    nikAyah: "",
    nomorKKAyah: "",
    namaLengkapAyah: "",
    tempatTanggalLahirAyah: "",
    agamaAyah: "",
    pekerjaanAyah: "",
    alamatAyah: "",
    wargaNegaraAyah: "",
    nikIbu: "",
    nomorKKIbu: "",
    namaLengkapIbu: "",
    tempatTanggalLahirIbu: "",
    agamaIbu: "",
    pekerjaanIbu: "",
    alamatIbu: "",
    wargaNegaraIbu: "",
    tanggalPengajuan: "", // Tambahkan tanggal pengajuan
    kecamatan: "", // Tambahkan kecamatan
    desaKelurahan: "", // Tambahkan desa/kelurahan
    kodeWilayah: "", // Tambahkan kode wilayah
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "suratKematian"), formData);
      alert("Data berhasil disimpan!");
      // Reset form setelah berhasil disimpan
      setFormData({
        nikPelapor: "",
        nomorKKPelapor: "",
        namaPelapor: "",
        tempatTanggalLahirPelapor: "",
        pekerjaanPelapor: "",
        nomorTeleponPelapor: "",
        alamatPelapor: "",
        nikKematian: "",
        nomorKKKematian: "",
        namaLengkapKematian: "",
        tempatTanggalLahirKematian: "",
        tanggalKematian: "",
        pukulKematian: "",
        sebabKematian: "",
        tempatKematian: "",
        yangMenerangkan: "",
        nomorTeleponKeluarga: "",
        emailKeluarga: "",
        nikAyah: "",
        nomorKKAyah: "",
        namaLengkapAyah: "",
        tempatTanggalLahirAyah: "",
        agamaAyah: "",
        pekerjaanAyah: "",
        alamatAyah: "",
        wargaNegaraAyah: "",
        nikIbu: "",
        nomorKKIbu: "",
        namaLengkapIbu: "",
        tempatTanggalLahirIbu: "",
        agamaIbu: "",
        pekerjaanIbu: "",
        alamatIbu: "",
        wargaNegaraIbu: "",
        tanggalPengajuan: "", // Reset tanggal pengajuan
        kecamatan: "",
        desaKelurahan: "",
        kodeWilayah: "",
      });
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg max-w-4xl w-full border border-gray-400"
      >
        <div className="flex items-center mb-4">
          <Link href="/">
            <div className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer">
              <img src="home.png" alt="Kembali" className="w-6 h-6 mr-2" />
              <span className="text-sm font-semibold">Kembali</span>
            </div>
          </Link>
        </div>
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-black">Provinsi : SULAWESI SELATAN</p>
              <p className="text-black">Kabupaten : GOWA</p>
              <p className="text-black">
                Kecamatan :
                <input
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-black"
                />
              </p>
              <p className="text-black">
                Desa / Kelurahan :
                <input
                  type="text"
                  name="desaKelurahan"
                  value={formData.desaKelurahan}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-black"
                />
              </p>
              <p className="text-black">
                Kode Wilayah :
                <input
                  type="text"
                  name="kodeWilayah"
                  value={formData.kodeWilayah}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-black"
                />
              </p>
            </div>
            <div className="text-right text-black">
              <p>F-2.01 Akta Kematian</p>
            </div>
          </div>
          <h2 className="text-center text-lg font-semibold mt-2 text-black">
            FORMULIR PELAPORAN PENCATATAN SIPIL DI DALAM WILAYAH NKRI
          </h2>
          <h2 className="text-center text-lg font-semibold text-black">
            AKTA KEMATIAN
          </h2>
        </div>

        {/* Data Pelapor */}
        <h3 className="text-lg font-semibold text-black border-b pb-2">
          Data Pelapor
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">1. NIK</label>
            <input
              type="text"
              name="nikPelapor"
              value={formData.nikPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">
              2. Nomor Kartu Keluarga (KK)
            </label>
            <input
              type="text"
              name="nomorKKPelapor"
              value={formData.nomorKKPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">3. Nama Lengkap</label>
            <input
              type="text"
              name="namaPelapor"
              value={formData.namaPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">4. Tempat, Tanggal Lahir</label>
            <input
              type="text"
              name="tempatTanggalLahirPelapor"
              value={formData.tempatTanggalLahirPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">5. Pekerjaan</label>
            <input
              type="text"
              name="pekerjaanPelapor"
              value={formData.pekerjaanPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">6. Nomor Telepon/HP/WA</label>
            <input
              type="text"
              name="nomorTeleponPelapor"
              value={formData.nomorTeleponPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black">7. Alamat</label>
          <input
            type="text"
            name="alamatPelapor"
            value={formData.alamatPelapor}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        {/* Data Kematian */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          Data Kematian
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">1. NIK</label>
            <input
              type="text"
              name="nikKematian"
              value={formData.nikKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">
              2. Nomor Kartu Keluarga (KK)
            </label>
            <input
              type="text"
              name="nomorKKKematian"
              value={formData.nomorKKKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">3. Nama Lengkap</label>
            <input
              type="text"
              name="namaLengkapKematian"
              value={formData.namaLengkapKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">4. Tempat, Tanggal Lahir</label>
            <input
              type="text"
              name="tempatTanggalLahirKematian"
              value={formData.tempatTanggalLahirKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">5. Tanggal Kematian</label>
            <input
              type="date"
              name="tanggalKematian"
              value={formData.tanggalKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">6. Pukul</label>
            <input
              type="time"
              name="pukulKematian"
              value={formData.pukulKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">7. Sebab Kematian</label>
            <select
              name="sebabKematian"
              value={formData.sebabKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Sebab Kematian</option>
              <option value="Sakit Biasa">Sakit Biasa</option>
              <option value="Wabah Penyakit">Wabah Penyakit</option>
              <option value="Kecelakaan">Kecelakaan</option>
              <option value="Kriminalitas">Kriminalitas</option>
              <option value="Bunuh Diri">Bunuh Diri</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">8. Tempat Kematian</label>
            <input
              type="text"
              name="tempatKematian"
              value={formData.tempatKematian}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">9. Yang Menerangkan</label>
            <select
              name="yangMenerangkan"
              value={formData.yangMenerangkan}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Yang Menerangkan</option>
              <option value="Dokter">Dokter</option>
              <option value="Tenaga Kesehatan">Tenaga Kesehatan</option>
              <option value="Kepolisian">Kepolisian</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">
              10. Nomor Telepon/HP/WA Salah satu Anggota Keluarga
            </label>
            <input
              type="text"
              name="nomorTeleponKeluarga"
              value={formData.nomorTeleponKeluarga}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">
              11. Email yang masih aktif Salah satu Anggota Keluarga
            </label>
            <input
              type="email"
              name="emailKeluarga"
              value={formData.emailKeluarga}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        {/* Data Orang Tua (Ayah) */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          Data Orang Tua (Ayah)
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">1. NIK</label>
            <input
              type="text"
              name="nikAyah"
              value={formData.nikAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">
              2. Nomor Kartu Keluarga (KK)
            </label>
            <input
              type="text"
              name="nomorKKAyah"
              value={formData.nomorKKAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">3. Nama Lengkap</label>
            <input
              type="text"
              name="namaLengkapAyah"
              value={formData.namaLengkapAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">4. Tempat, Tanggal Lahir</label>
            <input
              type="text"
              name="tempatTanggalLahirAyah"
              value={formData.tempatTanggalLahirAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">5. Agama</label>
            <input
              type="text"
              name="agamaAyah"
              value={formData.agamaAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">6. Pekerjaan</label>
            <input
              type="text"
              name="pekerjaanAyah"
              value={formData.pekerjaanAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black">7. Alamat</label>
          <input
            type="text"
            name="alamatAyah"
            value={formData.alamatAyah}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">8. Warga Negara</label>
          <select
            name="wargaNegaraAyah"
            value={formData.wargaNegaraAyah}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          >
            <option value="">Pilih Warga Negara</option>
            <option value="WNI">WNI</option>
            <option value="WNA">WNA</option>
          </select>
        </div>

        {/* Data Orang Tua (Ibu) */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          Data Orang Tua (Ibu)
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">NIK</label>
            <input
              type="text"
              name="nikIbu"
              value={formData.nikIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">Nomor KK</label>
            <input
              type="text"
              name="nomorKKIbu"
              value={formData.nomorKKIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">Nama Lengkap</label>
            <input
              type="text"
              name="namaLengkapIbu"
              value={formData.namaLengkapIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">Tempat, Tanggal Lahir</label>
            <input
              type="text"
              name="tempatTanggalLahirIbu"
              value={formData.tempatTanggalLahirIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="block text-black">Agama</label>
            <input
              type="text"
              name="agamaIbu"
              value={formData.agamaIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">Pekerjaan</label>
            <input
              type="text"
              name="pekerjaanIbu"
              value={formData.pekerjaanIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        {/* Bagian Tanda Tangan */}
        <div className="mb-4">
          <label className="block text-black">Tanggal Pengajuan</label>
          <input
            type="date"
            name="tanggalPengajuan"
            value={formData.tanggalPengajuan}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div id="bagian-24" className="form-section">
          <SignaturePad setSignature={setSignature} />
          {signature && (
            <img src={signature} alt="Tanda Tangan" className="mt-4 border" />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded mt-4"
        >
          Simpan Data
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
  );
}
