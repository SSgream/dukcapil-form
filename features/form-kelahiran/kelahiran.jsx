"use client";
import { useState } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import SignaturePad from "@/components/SignaturePad";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";

export default function FormKelahiran() {
  const [formData, setFormData] = useState({
    nomorKK: "",
    namaKepalaKeluarga: "",
    namaAnak: "",
    jenisKelamin: "",
    tempatDilahirkan: "",
    tempatLahir: "",
    hariLahir: "",
    tanggalLahir: "",
    pukulLahir: "",
    jenisKelahiran: "",
    kelahiranKe: "",
    penolongKelahiran: "",
    beratBayi: "",
    panjangBayi: "",
    // Data Ibu
    nikIbu: "",
    namaIbu: "",
    tanggalLahirIbu: "",
    pekerjaanIbu: "",
    alamatIbu: "",
    kewarganegaraanIbu: "",
    kebangsaanIbu: "",
    tanggalPerkawinan: "",
    // Data Ayah
    nikAyah: "",
    namaAyah: "",
    tanggalLahirAyah: "",
    pekerjaanAyah: "",
    alamatAyah: "",
    kewarganegaraanAyah: "",
    kebangsaanAyah: "",
    // Data Pelapor
    nikPelapor: "",
    namaPelapor: "",
    umurPelapor: "",
    jenisKelaminPelapor: "",
    pekerjaanPelapor: "",
    alamatPelapor: "",
    // Data Saksi I
    nikSaksi1: "",
    namaSaksi1: "",
    umurSaksi1: "",
    pekerjaanSaksi1: "",
    alamatSaksi1: "",
    // Data Saksi II
    nikSaksi2: "",
    namaSaksi2: "",
    umurSaksi2: "",
    pekerjaanSaksi2: "",
    alamatSaksi2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "surat_kelahiran"), formData);
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error:", error);
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
              <p className="text-black">
                Pemerintah Desa / Kelurahan :
                <input
                  type="text"
                  name="desaKelurahan"
                  value={formData.desaKelurahan}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-black"
                />
              </p>
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
              <p className="text-black">Kabupaten : GOWA</p>
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
              <p>F-2.01 Akta Kelahiran</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          SURAT KETERANGAN KELAHIRAN
        </h2>

        {/* Header */}
        <div className="border-b pb-4 mb-4">
          <div>
            <label className="block text-black">Nama Kepala Keluarga</label>
            <input
              type="text"
              name="namaKepalaKeluarga"
              value={formData.namaKepalaKeluarga}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">Nomor Kartu Keluarga</label>
            <input
              type="text"
              name="nomorKK"
              value={formData.nomorKK}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        {/* Data Anak */}
        <h3 className="text-lg font-semibold text-black border-b pb-2">
          BAYI / ANAK (Yang Akan Di Mohonkan Akte Kelahirannya)
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">1. Nama</label>
            <input
              type="text"
              name="namaAnak"
              value={formData.namaAnak}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">2. Jenis kelamin</label>
            <select
              name="jenisKelamin"
              value={formData.jenisKelamin}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-Laki">1. Laki-Laki</option>
              <option value="Perempuan">2. Perempuan</option>
            </select>
          </div>
        </div>

        <div className=" mb-4">
          <div>
            <label className="block text-black">3. Tempat dilahirkan</label>
            <select
              name="tempatDilahirkan"
              value={formData.tempatDilahirkan}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Tempat Dilahirkan</option>
              <option value="RS/RB">1. RS/RB</option>
              <option value="Puskesmas">2. Puskesmas</option>
              <option value="Polindes">3. Polindes</option>
              <option value="Rumah">4. Rumah</option>
              <option value="Lainnya">5. Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-black">4. Tempat kelahiran</label>
            <input
              type="text"
              name="tempatLahir"
              value={formData.tempatLahir}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">
              5. Hari dan Tanggal lahir
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="hariLahir"
                value={formData.hariLahir}
                onChange={handleChange}
                placeholder="Hari"
                className="w-1/3 p-2 border rounded text-black"
                required
              />
              <input
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleChange}
                className="w-2/3 p-2 border rounded text-black"
                required
              />
            </div>
          </div>
        </div>

        <div className=" mb-4">
          <div>
            <label className="block text-black">6. Pukul</label>
            <input
              type="time"
              name="pukulLahir"
              value={formData.pukulLahir}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">7. Jenis kelahiran</label>
            <select
              name="jenisKelahiran"
              value={formData.jenisKelahiran}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Jenis Kelahiran</option>
              <option value="Tunggal">1. Tunggal</option>
              <option value="Kembar 2">2. Kembar 2</option>
              <option value="Kembar 3">3. Kembar 3</option>
              <option value="Kembar 4">4. Kembar 4</option>
              <option value="Lainnya">5. Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-black">8. Kelahiran ke</label>
            <input
              type="number"
              name="kelahiranKe"
              value={formData.kelahiranKe}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">9. Penolong kelahiran</label>
            <select
              name="penolongKelahiran"
              value={formData.penolongKelahiran}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Penolong Kelahiran</option>
              <option value="Dokter">1. Dokter</option>
              <option value="Bidan/Perawat">2. Bidan/Perawat</option>
              <option value="Dukun">3. Dukun</option>
              <option value="Lainnya">4. Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-black">10. Berat bayi</label>
            <div className="flex items-center">
              <input
                type="number"
                name="beratBayi"
                value={formData.beratBayi}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded text-black"
                required
              />
              <span className="ml-2">Kg</span>
            </div>
          </div>
          <div>
            <label className="block text-black">11. Panjang bayi</label>
            <div className="flex items-center">
              <input
                type="number"
                name="panjangBayi"
                value={formData.panjangBayi}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded text-black"
                required
              />
              <span className="ml-2">Cm</span>
            </div>
          </div>
        </div>

        {/* Data Ibu */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          IBU (Orang Tua KANDUNG dari Anak)
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">1. NIK</label>
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
            <label className="block text-black">2. Nama lengkap</label>
            <input
              type="text"
              name="namaIbu"
              value={formData.namaIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">3. Tanggal Lahir / Umur</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="tanggalLahirIbu"
                value={formData.tanggalLahirIbu}
                onChange={handleChange}
                className="w-2/3 p-2 border rounded text-black"
                required
              />
              <input
                type="number"
                name="umurIbu"
                value={formData.umurIbu}
                onChange={handleChange}
                placeholder="Umur"
                className="w-1/3 p-2 border rounded text-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-black">4. Pekerjaan</label>
            <input
              type="text"
              name="pekerjaanIbu"
              value={formData.pekerjaanIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">5. Alamat</label>
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                name="alamatIbu"
                value={formData.alamatIbu}
                onChange={handleChange}
                placeholder="Desa/Kelurahan"
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                name="kecamatanIbu"
                value={formData.kecamatanIbu}
                onChange={handleChange}
                placeholder="Kecamatan"
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                name="kabupatenKotaIbu"
                value={formData.kabupatenKotaIbu}
                onChange={handleChange}
                placeholder="Kab/Kota"
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                name="provinsiIbu"
                value={formData.provinsiIbu}
                onChange={handleChange}
                placeholder="Provinsi"
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">6. Kewarganegaraan</label>
            <select
              name="kewarganegaraanIbu"
              value={formData.kewarganegaraanIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Kewarganegaraan</option>
              <option value="WNI">1. WNI</option>
              <option value="WNA">2. WNA</option>
            </select>
          </div>
          <div>
            <label className="block text-black">7. Kebangsaan</label>
            <input
              type="text"
              name="kebangsaanIbu"
              value={formData.kebangsaanIbu}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">
              8. Tgl Pencatatan Perkawinan
            </label>
            <input
              type="date"
              name="tanggalPerkawinan"
              value={formData.tanggalPerkawinan}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        {/* Data Ayah */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          AYAH (Orang Tua KANDUNG dari Anak)
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
            <label className="block text-black">2. Nama lengkap</label>
            <input
              type="text"
              name="namaAyah"
              value={formData.namaAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">3. Tanggal Lahir / Umur</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="tanggalLahirAyah"
                value={formData.tanggalLahirAyah}
                onChange={handleChange}
                className="w-2/3 p-2 border rounded text-black"
                required
              />
              <input
                type="number"
                name="umurAyah"
                value={formData.umurAyah}
                onChange={handleChange}
                placeholder="Umur"
                className="w-1/3 p-2 border rounded text-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-black">4. Pekerjaan</label>
            <input
              type="text"
              name="pekerjaanAyah"
              value={formData.pekerjaanAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">5. Alamat</label>
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                name="alamatAyah"
                value={formData.alamatAyah}
                onChange={handleChange}
                placeholder="Desa/Kelurahan"
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                name="kecamatanAyah"
                value={formData.kecamatanAyah}
                onChange={handleChange}
                placeholder="Kecamatan"
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                name="kabupatenKotaAyah"
                value={formData.kabupatenKotaAyah}
                onChange={handleChange}
                placeholder="Kab/Kota"
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                name="provinsiAyah"
                value={formData.provinsiAyah}
                onChange={handleChange}
                placeholder="Provinsi"
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">6. Kewarganegaraan</label>
            <select
              name="kewarganegaraanAyah"
              value={formData.kewarganegaraanAyah}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Kewarganegaraan</option>
              <option value="WNI">1. WNI</option>
              <option value="WNA">2. WNA</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-black">7. Kebangsaan</label>
          <input
            type="text"
            name="kebangsaanAyah"
            value={formData.kebangsaanAyah}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        {/* Data Pelapor */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          PELAPOR (Ayah/Ibu/KANDUNG dari Anak)
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
            <label className="block text-black">2. Nama lengkap</label>
            <input
              type="text"
              name="namaPelapor"
              value={formData.namaPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">3. Umur</label>
            <input
              type="number"
              name="umurPelapor"
              value={formData.umurPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">4. Jenis Kelamin</label>
            <select
              name="jenisKelaminPelapor"
              value={formData.jenisKelaminPelapor}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">1. Laki-laki</option>
              <option value="Perempuan">2. Perempuan</option>
            </select>
          </div>
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
        </div>

        <div className="mb-4">
          <label className="block text-black">6. Alamat</label>
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              name="alamatPelapor"
              value={formData.alamatPelapor}
              onChange={handleChange}
              placeholder="Desa/Kelurahan"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="kecamatanPelapor"
              value={formData.kecamatanPelapor}
              onChange={handleChange}
              placeholder="Kecamatan"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="kabupatenKotaPelapor"
              value={formData.kabupatenKotaPelapor}
              onChange={handleChange}
              placeholder="Kab/Kota"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="provinsiPelapor"
              value={formData.provinsiPelapor}
              onChange={handleChange}
              placeholder="Provinsi"
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        {/* Data Saksi I */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          SAKSI I
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">1. NIK</label>
            <input
              type="text"
              name="nikSaksi1"
              value={formData.nikSaksi1}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">2. Nama lengkap</label>
            <input
              type="text"
              name="namaSaksi1"
              value={formData.namaSaksi1}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">3. Umur</label>
            <input
              type="number"
              name="umurSaksi1"
              value={formData.umurSaksi1}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">4. Pekerjaan</label>
            <input
              type="text"
              name="pekerjaanSaksi1"
              value={formData.pekerjaanSaksi1}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black">5. Alamat</label>
          <div>
            <input
              type="text"
              name="alamatSaksi1"
              value={formData.alamatSaksi1}
              onChange={handleChange}
              placeholder="Desa/Kelurahan"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="kecamatanSaksi1"
              value={formData.kecamatanSaksi1}
              onChange={handleChange}
              placeholder="Kecamatan"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="kabupatenKotaSaksi1"
              value={formData.kabupatenKotaSaksi1}
              onChange={handleChange}
              placeholder="Kab/Kota"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="provinsiSaksi1"
              value={formData.provinsiSaksi1}
              onChange={handleChange}
              placeholder="Provinsi"
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        {/* Data Saksi II */}
        <h3 className="text-lg font-semibold text-black border-b pb-2 mt-6">
          SAKSI II
        </h3>
        <div className="mb-4">
          <div>
            <label className="block text-black">1. NIK</label>
            <input
              type="text"
              name="nikSaksi2"
              value={formData.nikSaksi2}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">2. Nama lengkap</label>
            <input
              type="text"
              name="namaSaksi2"
              value={formData.namaSaksi2}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="block text-black">3. Umur</label>
            <input
              type="number"
              name="umurSaksi2"
              value={formData.umurSaksi2}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black">4. Pekerjaan</label>
            <input
              type="text"
              name="pekerjaanSaksi2"
              value={formData.pekerjaanSaksi2}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black">5. Alamat</label>
          <div>
            <input
              type="text"
              name="alamatSaksi2"
              value={formData.alamatSaksi2}
              onChange={handleChange}
              placeholder="Desa/Kelurahan"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="kecamatanSaksi2"
              value={formData.kecamatanSaksi2}
              onChange={handleChange}
              placeholder="Kecamatan"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="kabupatenKotaSaksi2"
              value={formData.kabupatenKotaSaksi2}
              onChange={handleChange}
              placeholder="Kab/Kota"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="provinsiSaksi2"
              value={formData.provinsiSaksi2}
              onChange={handleChange}
              placeholder="Provinsi"
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div id="bagian-24" className="form-section">
          <SignaturePad setSignature={setSignature} />
          {signature && (
            <img src={signature} alt="Tanda Tangan" className="mt-4 border" />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white p-3 rounded mt-4"
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
