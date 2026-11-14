import Image from "next/image";

const Navbar = () =>{
    return (
        <nav className="bg-white shadow-md flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <Image src="/logo.png" width={100} height={100} alt="Logo" /> 
                <div>
                    <h1 className="text-2xl font-bold text-black">PEMERINTAH KABUPATEN GOWA</h1>
                    <h2 className="text-xl font-semibold text-orange-500">Dinas Kependudukan Dan Catatan Sipil</h2>
                </div>
            </div>
            <ul className="flex space-x-6 text-base font-semibold text-black">
                <li><a href="#" className="hover:text-orange-500">Home</a></li>
                <li><a href="#" className="hover:text-orange-500">Informasi</a></li>
                <li><a href="#" className="hover:text-orange-500">Standar Pelayanan</a></li>
                <li><a href="#" className="hover:text-orange-500">Layanan Online</a></li>
                <li><a href="#" className="hover:text-orange-500">Data</a></li>
                <li><a href="#" className="hover:text-orange-500">Download</a></li>
                <li><a href="#" className="hover:text-orange-500">Galerry</a></li>
                <li><a href="#" className="hover:text-orange-500">Tentang Kami</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;