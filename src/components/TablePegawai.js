import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

const TablePegawai = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialUsers = [
    {
      nama: "Nasrah Fuadi, A.Ma",
      nip: "198503072006042003",
      jabatan: "Bendahara Pengeluaran",
      masaKerja: "17 Tahun 06 Bulan",
      unitKerja: "Stasiun Klimatologi Aceh",
      alamat:
        "Lampanah Baro Kecamatan Indrapuri Kabupaten Aceh Besar Provinsi Aceh",
      noTelp: "085260255056",
      jumlahCutiTahunan: 12,
    },
    
    {
      nama: "Jane Smith",
      nip: "198702021234567890",
      jabatan: "Data Scientist",
      masaKerja: "8 Tahun 10 Bulan",
      unitKerja: "AI Research Lab",
      alamat:
        "Lampanah Baro Kecamatan Indrapuri Kabupaten Aceh Besar Provinsi Aceh",
      noTelp: "080987654321",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "Sophia Lee",
      nip: "198912032006012345",
      jabatan: "UX Designer",
      masaKerja: "4 Tahun 7 Bulan",
      unitKerja: "Design Studio",
      alamat: "567 Design Avenue, San Francisco, USA",
      noTelp: "+141512345678",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "Miguel Fernandez",
      nip: "198803012006072345",
      jabatan: "Operations Manager",
      masaKerja: "11 Tahun 2 Bulan",
      unitKerja: "Operations Department",
      alamat: "234 Operations Street, Madrid, Spain",
      noTelp: "+34987654321",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "Anna Petrova",
      nip: "198605152006032345",
      jabatan: "Senior Scientist",
      masaKerja: "13 Tahun 9 Bulan",
      unitKerja: "Research Institute",
      alamat: "789 Research Avenue, Moscow, Russia",
      noTelp: "+79012345678",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "David Brown",
      nip: "198502282006092345",
      jabatan: "Sales Manager",
      masaKerja: "14 Tahun 5 Bulan",
      unitKerja: "Sales Division",
      alamat: "345 Sales Street, London, UK",
      noTelp: "+44123456789",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "Julia Kim",
      nip: "198711102006062345",
      jabatan: "Product Manager",
      masaKerja: "6 Tahun 11 Bulan",
      unitKerja: "Product Development",
      alamat: "678 Product Avenue, Seoul, South Korea",
      noTelp: "+821012345678",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "Andreas Mueller",
      nip: "198409222006052345",
      jabatan: "Quality Assurance Specialist",
      masaKerja: "9 Tahun 3 Bulan",
      unitKerja: "Quality Control",
      alamat: "901 Quality Street, Berlin, Germany",
      noTelp: "+491234567890",
      jumlahCutiTahunan: 12,
    },
    {
      nama: "Elena Vasiliev",
      nip: "198807172006032345",
      jabatan: "HR Specialist",
      masaKerja: "7 Tahun 8 Bulan",
      unitKerja: "Human Resources",
      alamat: "123 HR Avenue, St. Petersburg, Russia",
      noTelp: "+79234567890",
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
    nip,
    jabatan,
    masaKerja,
    unitKerja,
    alamat,
    noTelp,
    jumlahCutiTahunan
  ) => {
    navigate(
      `/form/${encodeURIComponent(nama)}/${encodeURIComponent(
        nip
      )}/${encodeURIComponent(jabatan)}/${encodeURIComponent(
        masaKerja
      )}/${encodeURIComponent(unitKerja)}/${encodeURIComponent(
        alamat
      )}/${encodeURIComponent(noTelp)}/${encodeURIComponent(jumlahCutiTahunan)}`
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
              <th className="py-3 px-6 text-left font-semibold">NIP</th>
              <th className="py-3 px-6 text-left font-semibold">Jabatan</th>
              <th className="py-3 px-6 text-left font-semibold">Masa Kerja</th>
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
                <td className="py-4 px-6">{user.nip}</td>
                <td className="py-4 px-6">{user.jabatan}</td>
                <td className="py-4 px-6">{user.masaKerja}</td>
                <td className="py-4 px-6">{user.unitKerja}</td>
                <td className="py-4 px-6 text-center">
                  {user.jumlahCutiTahunan} Hari
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() =>
                      handleAjukanCuti(
                        user.nama,
                        user.nip,
                        user.jabatan,
                        user.masaKerja,
                        user.unitKerja,
                        user.alamat,
                        user.noTelp,
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
