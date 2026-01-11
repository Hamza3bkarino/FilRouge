'use client';

import React from "react";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";

export default function ExportButton({ data, type = "programs" }) {

  const handleExportPDF = () => {
    if (!data || data.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      type === "products" ? "Products List" : "Programs List",
      14,
      22
    );

    doc.setFontSize(11);
    let y = 30;

    if (type === "programs") {
      // 🔹 PROGRAMS HEADER
      doc.text("Name", 14, y);
      doc.text("Level", 55, y);
      doc.text("Goal", 90, y);
      doc.text("Duration", 120, y);
      doc.text("Status", 155, y);
      y += 6;

      // 🔹 PROGRAMS ROWS
      data.forEach((p) => {
        doc.text(p.name || "", 14, y);
        doc.text(p.level || "", 55, y);
        doc.text(p.goal || "", 90, y);
        doc.text(p.duration || "", 120, y);
        doc.text(p.status === "active" ? "Active" : "Draft", 155, y);
        y += 6;

        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("programs.pdf");
    }

    if (type === "products") {
      // 🔹 PRODUCTS HEADER
      doc.text("Name", 14, y);
      doc.text("desc", 70, y);
      doc.text("Price", 120, y);
      doc.text("Stock", 150, y);
      y += 6;

      // 🔹 PRODUCTS ROWS
      data.forEach((p) => {
        doc.text(p.name || "", 14, y);
        doc.text(p.desciption || "", 200, y);
        doc.text(String(p.price ?? ""), 120, y);
        doc.text(String(p.stock ?? ""), 150, y);
        y += 6;

        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("products.pdf");
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      className="flex cursor-pointer items-center gap-2 bg-gray-900 border border-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
    >
      <FiDownload className="w-4 h-4" />
      Export
    </button>
  );
}
