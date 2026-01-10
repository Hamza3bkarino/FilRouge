'use client';

import React from "react";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf"; // use only jsPDF

export default function ExportButton({ data }) {

  const handleExportPDF = () => {
    if (!data || data.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Programs List", 14, 22);

    doc.setFontSize(11);
    let y = 30;

    // Header
    doc.text("Name", 14, y);
    doc.text("Level", 60, y);
    doc.text("Goal", 100, y);
    doc.text("Status", 140, y);
    doc.text("Created At", 170, y);

    y += 6;

    // Rows
    data.forEach((p) => {
      doc.text(p.name || "", 14, y);
      doc.text(p.level || "", 60, y);
      doc.text(p.goal || "", 100, y);
      doc.text(p.status === "spero" ? "active" : "draft", 140, y);
      doc.text(p.createdAt ? p.createdAt.split("T")[0] : "", 170, y);
      y += 6;

      // Add new page if y is too low
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("programs.pdf");
  };

  return (
    <button
      onClick={handleExportPDF}
      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 border border-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
    >
      <FiDownload className="w-4 h-4" />
      Export
    </button>
  );
}
