import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

const TablePegawai = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialUsers = [
    {
      nama: "EKO CAHYO PRISTIWANTORO,SP,M.Si",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },

    {
      nama: "MUHAJIR",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "SUTARNI",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "NIZAR PURNAMA",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "PUTRI MEINELVA, S.Tr",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "ENDANG PAMULATSIH, S.Tr",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "FITROHIM, S.Tr",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "MOH. RIZAL",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "RAHMAH WULAN, SST",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "DEA RIMASILANA, S.Tr",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "HARISA BILHAQQI QALBI, S.Si",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "MUHAMMAD IRFAN ISLAMI, S.Tr",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "NENGAH BENNUWARDANA, ST",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "ADZANI PUTRI WIDOWATI",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "AYUSRI WIJAYA PUTRI",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "KHAIRUL AKHYAR, A.Md",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "MUHAMMAD AGI WARDHANA",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "NUR IRFAN WICAKSONO",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "NASRAH FUADI, A.Ma",
      unitKerja: "Stasiun Klimatologi Aceh",
      jumlahCutiTahunan: 12,
    },
  ];

  // Load users from localStorage if available
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  // Update the users state and localStorage when location.state changes
  useEffect(() => {
    if (location.state?.updatedFormData) {
      const updatedUser = location.state.updatedFormData;
      const updatedUsers = users.map((user) =>
        user.nama === updatedUser.nama
          ? { ...user, jumlahCutiTahunan: updatedUser.remainingAnnualLeave }
          : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  }, [location.state, users]);

  const handleAjukanCuti = (
    nama,
    unitKerja,
    jumlahCutiTahunan
  ) => {
    navigate(
      `/form/${encodeURIComponent(nama)}/${encodeURIComponent(
        unitKerja
      )}/${encodeURIComponent(jumlahCutiTahunan)}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10 font-Poppins">
      <h1 className="text-3xl font-bold text-center mb-8">
        Daftar Pegawai dan Pengajuan Cuti
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-200 border shadow-lg">
            <tr>
              <th className="py-3 px-6 text-left font-semibold">No.</th>
              <th className="py-3 px-6 text-left font-semibold">Nama</th>
              <th className="py-3 px-6 text-left font-semibold">Unit Kerja</th>
              <th className="py-3 px-6 text-center font-semibold">
                Sisa Cuti Tahunan
              </th>
              <th className="py-3 px-6 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="border shadow-lg">
            {users.map((user, index) => (
              <tr
                key={index}
                className={
                  (index % 2 === 0 ? "bg-gray-50" : "bg-white") +
                  " border-b hover:bg-gray-100 text-sm"
                }
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{user.nama}</td>
                <td className="py-4 px-6">{user.unitKerja}</td>
                <td className="py-4 px-6 text-center">
                  {user.jumlahCutiTahunan} Hari
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() =>
                      handleAjukanCuti(
                        user.nama,
                        user.unitKerja,
                        user.jumlahCutiTahunan
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  >
                    <FiCalendar className="mr-2" />
                    <span className="text-xs"> Ajukan Cuti </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePegawai;
