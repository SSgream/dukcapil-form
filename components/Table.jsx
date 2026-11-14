const Table = () => {
    return (
      <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-300 text-black">
              <th className="border border-black px-4 py-2 w-16 text-center">NO</th>
              <th className="border border-black px-4 py-2 w-64 text-center">NIK</th>
              <th className="border border-black px-4 py-2 w-96 text-center">NAMA LENGKAP</th>
              <th className="border border-black px-4 py-2 w-20 text-center">SHDK</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i}>
                {/* NO */}
                <td className="border border-black px-4 py-2 text-center text-black">
                  <input
                    type="text"
                    maxLength="2"
                    className="w-full p-2 border bg-white rounded border-black text-center text-black"
                  />
                </td>
                {/* NIK */}
                <td className="border border-black px-4 py-2">
                  <input
                    type="text"
                    className="w-full p-2 border bg-white rounded border-black text-black"
                  />
                </td>
                {/* NAMA LENGKAP */}
                <td className="border border-black px-4 py-2 ">
                  <input
                    type="text"
                    className="w-full p-2 border bg-white rounded border-black text-black"
                  />
                </td>
                {/* SHDK */}
                <td className="border border-black px-4 py-2 text-center">
                  <input
                    type="text"
                    className="w-full p-2 border bg-white rounded border-black text-center text-black"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  