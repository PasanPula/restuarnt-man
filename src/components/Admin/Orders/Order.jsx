import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useOrderContext } from "../../../context/OrderContext/OrderProvider";
import { deleteOrder, fetchOrders } from "../../../api/api";
import { getOrderPrice } from "../../../util/utilFunctions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../assets/logo2.png";

const Order = ({ item }) => {
  const [{ orders }, orderDispatch] = useOrderContext();
  const handleDeleteOrder = async () => {
    await deleteOrder(item._id, "Order Deleted successfuly.");
    await fetchOrders(orderDispatch);
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const margin = 40;
    const pageWidth = doc.internal.pageSize.width - 2 * margin;
    let y = 50;

    // Styling
    doc.addFont('Poppins', 'sans-serif');
    // Set Poppins as the default font
    doc.setFont('Poppins');
    doc.setFontSize(12);

    // Load and add the company logo
    const logoImg = new Image();
    logoImg.src = logo;
    logoImg.onload = function () {
      doc.addImage(logoImg, "PNG", margin, 10, 130, 80);

      // Calculate the Y-coordinate for the start of company information
      const yForCompanyInfo = 110;

      // Styling
      doc.setFontSize(12);

      // Company Information (Header)
      const companyName = "River's Edge,";
      const companyAddress = "123 Company Street, City, State.";
      const companyContact = "Phone: (123) 456-7890 | Email: info@example.com";

      // Position the company information below the image
      let y = yForCompanyInfo;

      // Header
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(companyName, margin, y);
      y += 15;
      doc.text(companyAddress, margin, y);
      y += 15;
      doc.text(companyContact, margin, y);

      // Divider line after company info
      y += 15;
      doc.setLineWidth(1);
      doc.setDrawColor(128);
      doc.line(margin, y, pageWidth + margin, y);
      y += 30;

      // Invoice Information
      const orderNo = item?.order_id || "Order";
      const orderDate = new Date(item?.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const paymentMethod = item?.payment_method

      doc.setFontSize(14);
      doc.text(`Invoice: ${orderNo}`, margin, y);
      y += 20;
      doc.setFontSize(12);
      doc.text(`Date: ${orderDate}`, margin, y);
      y += 20;
      doc.setFontSize(12);
      doc.text(`Payment Method: ${paymentMethod}`, margin, y);
      y += 20;

      // Divider line after invoice info
      y += 10;
      doc.setDrawColor(128);
      doc.line(margin, y, pageWidth + margin, y);
      y += 10;

// Dishes Table
const columns = ["Dish", "Addons", "Quantity", "Price"];
const data = [];
let grandTotal = 0;

item.items.forEach((dish) => {
  // Calculate the total price of addons for this dish
  const addonTotalPrice = dish.selectedOptions.reduce((total, addon) => total + (addon.price * dish.qty), 0);

  // Calculate the total price for the dish (dish price * quantity + addonTotalPrice)
  const dishTotalPrice = (dish.item_id.price * dish.qty);

  // Create an array of rows for this dish and its addons
  const dishRow = [
    dish.item_id.title,
    "",
    dish.qty + " x " + dish.item_id.price,
    `Rs. ${(dishTotalPrice).toFixed(2)}`,
  ];

  data.push(dishRow);

  // Add rows for each addon
  dish.selectedOptions.forEach((addon) => {
    const addonRow = [
      "",
      addon.option,
      dish.qty + " x " + addon.price,
      `Rs. ${(addon.price * dish.qty).toFixed(2)}`,
    ];
    data.push(addonRow);
  });

  grandTotal = grandTotal +  dishTotalPrice + addonTotalPrice;
});

// Add a special row for the grand total
const grandTotalRow = [
  { content: "", colSpan: 2, styles: { fontStyle: "bold" } }, // Empty cell
  { content: "Grand Total", styles: { fontStyle: "bold" } }, 
  { content: `Rs. ${grandTotal.toFixed(2)}`, styles: { fontStyle: "bold" } },
];
data.push(grandTotalRow);

const table = {
  head: [columns],
  body: data,
  startY: y,
  margin: { left: margin, right: margin },
  tableWidth: "auto",
  styles: {
    lineColor: [128],
    lineWidth: 0.3,
    fontSize: 12,
    cellPadding: 8,
    valign: "middle",
    halign: "center",
    overflow: "linebreak",
  },
  headStyles: {
    fillColor: [155, 128, 78],
    textColor: [255],
    fontStyle: "bold",
  },
  columnStyles: {
    0: { halign: "left" }, // Dish column left-aligned
    1: { halign: "left" }, // Addons column left-aligned
    2: { halign: "center" }, // Quantity column centered
    3: { halign: "right" }, // Price column right-aligned
  },
};

doc.autoTable(table);

      // Calculate the Y-coordinate for the total amount
      let yForTotalAmount = doc.lastAutoTable.finalY + 30;

      // Divider line after the table
      yForTotalAmount += 10;
      doc.line(margin, yForTotalAmount, pageWidth + margin, yForTotalAmount);

      // Display Total Amount (Replace with your actual total amount)
      doc.setFontSize(14);
      doc.text(
        `Total Amount: Rs. ${grandTotal.toFixed(2)}`,
        margin,
        yForTotalAmount + 20,
        {
          align: "left",
        }
      );

      // Add Payment Method (Replace with your actual payment method)
      // const paymentMethod = "Payment Method: Credit Card";
      // doc.setFontSize(12);
      // doc.text(paymentMethod, margin, yForTotalAmount + 40);

      // Save the current Y-coordinate before adding the disclaimer
      const startYForDisclaimer = doc.internal.pageSize.height - 30;

      // Disclaimer text
      const disclaimerText =
        "This is a computer-generated invoice. No signature is required.";

      // Add the disclaimer at the bottom
      doc.setFontSize(10);
      doc.setTextColor(100); // Gray text color
      doc.text(disclaimerText, margin, startYForDisclaimer);

      // Get the current date and time for bill generation
      const billGeneratedTime = new Date().toLocaleString("en-US");

      // Add the bill generated time
      doc.setFontSize(10);
      doc.setTextColor(0); // Reset text color to black
      doc.text(
        `Bill Generated: ${billGeneratedTime}`,
        margin,
        startYForDisclaimer + 20
      );

      // Generate the PDF as a Blob
      const pdfBlob = doc.output("blob");

      // Create a Blob URL for the PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(pdfUrl);

      // Cleanup: Revoke the Blob URL to release resources
      URL.revokeObjectURL(pdfUrl);
    };
  };

  return (
    <div className="relative w-full h-auto border rounded-lg bg-slate-300 border-orange-50">
      <div className="flex flex-col items-center justify-center gap-5 p-5 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h5 className="mb-1 text-2xl font-bold text-black">Order No:</h5>
          <span className="mb-2 text-lg font-medium text-black">
            {item?.order_id || "Order"}
          </span>
          <h3 className="mb-1 text-2xl font-bold text-black">Order Value:</h3>
          <span className="mb-2 text-lg font-medium text-black">
            {"Rs." + getOrderPrice(item) + ".00" || "Order"}
          </span>
        </div>
        <span className="text-sm text-black">
          {new Date(item?.updatedAt).toLocaleString("en-US")}
        </span>
      </div>

      {/* Dishes Section */}
      <div className="p-5 border-t border-gray-300">
        <h6 className="mb-4 text-2xl font-bold text-gray-900">Dishes:</h6>
        <ul className="ml-6 space-y-4">
          {item.items.map((dish) => (
            <li
              key={dish.item_id._id}
              className="py-2 border-b border-gray-400"
            >
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-2">
                  <span className="text-lg font-semibold">
                    {dish.item_id.title}
                  </span>
                  <span className="ml-2 text-gray-600">({dish.qty} Items)</span>
                </div>
                <span className="text-lg text-gray-600">
                  [DISH ID: {dish._id}]
                </span>
              </div>
              <div className="mt-2">
                <span className="text-lg font-semibold">Instructions:</span>
                <br />
                <p className="text-gray-800">{dish.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row items-center justify-between p-3">
        <button
          className="flex items-center px-4 py-2 text-lg text-white bg-red-600 rounded-md shadow-lg cursor-pointer hover:bg-red-700"
          title="Delete"
          onClick={() => {
            handleDeleteOrder();
          }}
        >
          <MdDeleteForever className="mr-2" /> Delete
        </button>

        <button
          className="flex items-center px-4 py-2 text-lg text-white bg-blue-600 rounded-md shadow-lg cursor-pointer hover:bg-blue-700"
          title="Generate PDF"
          onClick={() => {
            generatePDF();
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Order;
