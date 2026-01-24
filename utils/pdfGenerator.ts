
export const downloadReceiptPDF = async (reference: string, userData: any) => {
  // Dynamic imports to prevent SSR execution
  const jsPDF = (await import("jspdf")).default;
  const html2canvas = (await import("html2canvas")).default;

  const element = document.createElement("div");
  // ... rest of the function remains the same ...
  element.style.padding = "40px";
  element.style.width = "600px";
  element.style.background = "white";
  element.style.color = "black";
  element.style.fontFamily = "sans-serif";

  element.innerHTML = `
    <div style="border: 2px solid #1a73e8; padding: 30px; border-radius: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px;">
        <div>
          <h1 style="color: #1a73e8; margin: 0; font-size: 28px;">ICE HUB</h1>
          <p style="margin: 5px 0; color: #666; font-size: 12px;">Official Payment Receipt</p>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0; font-weight: bold;">Date: ${new Date().toLocaleDateString()}</p>
          <p style="margin: 5px 0; font-size: 12px; color: #666;">Ref: ${reference}</p>
        </div>
      </div>
      
      <div style="margin-bottom: 40px;">
        <h3 style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Customer Details</h3>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${userData.name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${userData.email}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${userData.phone}</p>
      </div>
      
      <div style="background-color: #f8faff; padding: 25px; border-radius: 15px; margin-bottom: 40px;">
        <h3 style="margin-bottom: 15px; color: #1a73e8;">Booking Summary</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span>Workspace Plan:</span>
          <span style="font-weight: bold;">${userData.planTitle}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold; margin-top: 20px; border-top: 2px dashed #d1e2ff; padding-top: 15px;">
          <span>Total Paid:</span>
          <span>${userData.selectedPrice}</span>
        </div>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 11px;">
        <p>Thank you for choosing ICE HUB. This is a computer-generated receipt.</p>
        <p>ICE HUB - Digital Innovation Center</p>
      </div>
    </div>
  `;

  document.body.appendChild(element);

  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ICEHUB_Receipt_${reference}.pdf`);
  } catch (error) {
    console.error("PDF generation failed:", error);
  } finally {
    document.body.removeChild(element);
  }
};
