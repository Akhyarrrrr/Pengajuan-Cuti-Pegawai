import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FormPengajuanCuti = ({ setFormData }) => {
  const {
    nama,
    nip,
    jabatan,
    masaKerja,
    unitKerja,
    alamat,
    noTelp,
    jumlahCutiTahunan,
  } = useParams();

  const navigate = useNavigate();

  const [formData, setLocalFormData] = useState({
    leaveType: "",
    message: "",
    leaveDays: "",
    startDate: "",
    endDate: "",
    confirm: false,
    nama: decodeURIComponent(nama),
    nip: decodeURIComponent(nip),
    jabatan: decodeURIComponent(jabatan),
    masaKerja: decodeURIComponent(masaKerja),
    unitKerja: decodeURIComponent(unitKerja),
    alamat: decodeURIComponent(alamat),
    noTelp: decodeURIComponent(noTelp),
    jumlahCutiTahunan: decodeURIComponent(jumlahCutiTahunan),
  });

  const [remainingAnnualLeave, setRemainingAnnualLeave] = useState(
    decodeURIComponent(jumlahCutiTahunan)
  );

  const [editableLeaveDays, setEditableLeaveDays] = useState("");
  const [editableEndDate, setEditableEndDate] = useState("");

  useEffect(() => {
    setEditableLeaveDays(formData.leaveDays);
    setEditableEndDate(formData.endDate);
  }, [formData.leaveDays, formData.endDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "startDate" || name === "endDate") {
      const startDate =
        name === "startDate" ? new Date(value) : new Date(formData.startDate);
      const endDate =
        name === "endDate" ? new Date(value) : new Date(formData.endDate);
      if (endDate < startDate) {
        alert("Tanggal selesai tidak boleh sebelum tanggal mulai");
        return;
      }
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setLocalFormData({
        ...formData,
        [name]: value,
        leaveDays: diffDays.toString(),
      });
      setEditableLeaveDays(diffDays.toString());
      setEditableEndDate(value);
    } else {
      setLocalFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.leaveType &&
      formData.message &&
      formData.leaveDays &&
      formData.startDate &&
      formData.endDate &&
      formData.confirm
    ) {
      let newRemainingAnnualLeave = remainingAnnualLeave;
      if (formData.leaveType === "Cuti Tahunan") {
        newRemainingAnnualLeave =
          remainingAnnualLeave - parseInt(formData.leaveDays);
        if (newRemainingAnnualLeave < 0) {
          alert(
            "Jumlah cuti yang diambil melebihi jumlah cuti tahunan yang tersisa."
          );
          return;
        }
        setRemainingAnnualLeave(newRemainingAnnualLeave);
      }
      setFormData({
        ...formData,
        remainingAnnualLeave: newRemainingAnnualLeave,
      });
      navigate("/tampilkan-data-cuti", {
        state: {
          formData: {
            ...formData,
            remainingAnnualLeave: newRemainingAnnualLeave,
          },
        },
      });
    } else {
      alert("Silakan lengkapi semua field sebelum mengajukan cuti.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center font-Poppins">
      <div className="bg-white w-full md:w-3/4 lg:w-1/2 xl:w-1/3 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Form Cuti Karyawan
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-gray-700 font-medium">
            Halo{" "}
            <span className="font-bold text-lg">
              {decodeURIComponent(nama)}
            </span>
            <p>
              Jumlah Cuti Tahunan tersisa
              <span className="font-bold text-lg ml-1">
                {remainingAnnualLeave}{" "}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="leaveType"
              className="block text-gray-700 font-medium mb-2"
            >
              Jenis Cuti yang diambil
            </label>
            <select
              id="leaveType"
              name="leaveType"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="" disabled className="text-gray-400">
                Silahkan Pilih Jenis Cuti
              </option>
              <option value="Cuti Tahunan">Cuti Tahunan</option>
              <option value="Cuti Besar">Cuti Besar</option>
              <option value="Cuti Sakit">Cuti Sakit</option>
              <option value="Cuti Melahirkan">Cuti Melahirkan</option>
              <option value="Cuti Karena Alasan Penting">
                Cuti Karena Alasan Penting
              </option>
              <option value="Cuti di Luar Tanggungan Negara">
                Cuti di Luar Tanggungan Negara
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Alasan Cuti
            </label>
            <textarea
              id="message"
              name="message"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              rows="2"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Tanggal Mulai
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Tanggal Selesai
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                min={formData.startDate}
                value={editableEndDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="leaveDays"
              className="block text-gray-700 font-medium mb-2"
            >
              Lamanya Cuti (Hari)
            </label>
            <input
              type="text"
              id="leaveDays"
              name="leaveDays"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              value={editableLeaveDays}
              onChange={(e) => setEditableLeaveDays(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Apakah Anda sudah mengisi data di atas dengan benar?
            </label>
            <input
              type="checkbox"
              id="confirm"
              name="confirm"
              className="mr-2 leading-tight"
              checked={formData.confirm}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirm" className="text-gray-700">
              Ya
            </label>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPengajuanCuti;
