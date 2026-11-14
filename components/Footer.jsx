import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text white mt-10">
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Logo Dan Alamat */}
                    <section>
                        <div>
                            <Image src="/logo.png" width={100} height={100} alt="Logo" />
                            <p className="text-sm mt-2">Jl. Tumanurung No.2, Sungguminasa - Gowa</p>
                            <p className="text-sm mt-2">Telp: +62 812 3456 7890</p>
                        </div>
                    </section>

                    {/* Subscribe*/}
                    <div>
                        <h3 className="text-lg font-bold">Subscribe Us</h3>
                        <div className="flex mt-2">
                            <input className="p-2 rounded-1 bg-gray-800 text-white border-none w-full"
                                type="text" 
                                placeholder="Email Anda"
                            />
                            <button className="bg-red-500 p-2 rounded-r">Subscribe</button>
                        </div>
                    </div>
                    
                    {/* Section Kanan */}
                    <section>
                        <h3 className="text-lg font-bold">Waktu Pelayanan</h3>
                        <hr className="my-2 border-gray-700"/>
                        <p className="text-sm mt-2">Senin - Kamis: 07.30 - 16.00 WITA</p>
                        <p className="text-sm">Jumat: 07.30 - 17.00 WITA</p>
                        <p className="text-sm">Sabtu: Tutup</p>
                        <br />
                        <h3 className="text-lg font-bold">Waktu Pelayanan Online</h3>
                        <hr className="my-2 border-gray-700"/>
                        <p className="text-sm mt-2">Senin - Minggu: 00.00 - 16.00 WITA</p>
                        <p className='text-xs'>(24 Jam x 7 hari termasuk hari libur)</p>
                    </section>
                </div>
            </div>
        </footer>
    );
}

export default Footer;