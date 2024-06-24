import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import TablePegawai from "./components/TablePegawai";
import FormPengajuanCuti from "./components/FormPengajuanCuti";
import DetailPengajuanCuti from "./components/DetailPengajuanCuti";

const Root = () => {
  const [formData, setFormData] = useState(null);

  return (
    <React.StrictMode>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<TablePegawai />} />
          <Route path="/form" element={<FormPengajuanCuti />} />
          <Route
            path="/form/:nama/:nip/:unitKerja/:jumlahCutiTahunan"
            element={<FormPengajuanCuti setFormData={setFormData} />}
          />
          <Route
            path="/tampilkan-data-cuti"
            element={<DetailPengajuanCuti formData={formData} />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
reportWebVitals();
