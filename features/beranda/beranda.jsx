import Link from "next/link";
import Image from "next/image";

export default function Beranda() {
  const forms = [
    {
      title: "Formulir Akta Kelahiran",
      description:
        "Formulir untuk pengajuan permohonan pembuatan Akta Kelahiran.",
      link: "/Kelahiran",
      icon: "/kelahiran.png",
    },
    {
      title: "Formulir Perpindahan Penduduk",
      description:
        "Formulir untuk pengajuan pindah domisili dari satu daerah ke daerah lain.",
      link: "/Perpindahan",
      icon: "/perpindahan.png",
    },
    {
      title: "Formulir Perubahan Penduduk",
      description:
        "Formulir untuk pembuatan atau perubahan data pada Kartu Keluarga.",
      link: "/Perubahan",
      icon: "/perubahan.png",
    },
    {
      title: "Formulir Akta Kematian",
      description:
        "Formulir untuk pengajuan permohonan pembuatan Akta Kematian.",
      link: "/Kematian",
      icon: "/kematian.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative w-full h-[550px] overflow-hidden">
        <Image
          src="/images/dukcapil.jpg"
          alt="Gedung Dukcapil"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="opacity-90"
        />
        {/* Gradasi di bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent"></div>

        {/* Formulir Text di dalam header */}
        <div className="absolute bottom-24 w-full text-center px-4">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Formulir</h3>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Di halaman ini, tersedia berbagai formulir yang dapat diakses,
            seperti formulir akta kelahiran, perpindahan Penduduk, Perubahan
            Penduduk dan Akta Kematian.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6 pt-16 pb-16">
        {forms.map((form, index) => (
          <Link
            key={index}
            href={form.link}
            className="group bg-white border border-black rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center hover:bg-blue-100"
          >
            <div className="w-20 h-20 mb-4 relative">
              <Image
                src={form.icon}
                alt={form.title}
                layout="fill"
                objectFit="contain"
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700">
              {form.title}
            </h4>
            <p className="mt-2 text-sm text-gray-700">{form.description}</p>
          </Link>
        ))}
      </div>

      {/* Helpdesk Section */}
      <div className="flex justify-center pb-16">
        <div className="bg-white border border-black rounded-xl p-6 max-w-4xl w-full mx-4 text-center">
          <h5 className="text-2xl font-bold mb-6 text-black">Helpdesk</h5>
          <div className="flex flex-col md:flex-row justify-center items-center gap-24">
            {/* Email */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 mb-2">
                <Image src="/email.png" alt="Email" width={40} height={40} />
              </div>
              <h6 className="font-bold text-black">Email</h6>
              <p className="text-black text-sm mt-1">
                disdukcapil.gowakab@gmail.com
              </p>
            </div>
            {/* Instagram */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 mb-2">
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                />
              </div>
              <h6 className="font-bold text-black">Instagram</h6>
              <p className="text-black text-sm mt-1">disdukcapilgowa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
