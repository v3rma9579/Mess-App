function generatePDF() {
    const element = document.getElementById("mess-menu");

    html2pdf()
        .set({
            margin: 1,
            filename: "mess-menu.pdf",
            // image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
        })
        .from(element)
        .save();
}