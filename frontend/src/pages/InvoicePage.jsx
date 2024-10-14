import React from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin
import './InvoicePage.css';

function InvoicePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // Get Cart from localStorage for the logged-in user
  const cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];

  // Dummy invoice data
  const invoiceData = {
    customerName: username,
    items: cart,
    total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    date: new Date().toLocaleDateString(),
    timestamp: new Date().toLocaleString(), // Store date and time
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set font and title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Invoice', 20, 20);
    
    // Customer Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Customer Name: ${invoiceData.customerName}`, 20, 30);
    doc.text(`Date: ${invoiceData.timestamp}`, 20, 40);
    
    // Table Header
    doc.autoTable({
      head: [['Item', 'Quantity', 'Price', 'Total']],
      body: invoiceData.items.map(item => [
        item.name,
        item.quantity,
        `₹${item.price.toFixed(2)}`,
        `₹${(item.price * item.quantity).toFixed(2)}`,
      ]),
      startY: 50,
      headStyles: { fillColor: [22, 160, 133] },
      styles: { cellPadding: 3, fontSize: 10 },
    });
    
    // Total Price
    doc.text(`Total: ₹${invoiceData.total.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);
    
    // Save PDF
    doc.save('invoice.pdf');
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    const orders = JSON.parse(localStorage.getItem(`orders_${username}`)) || [];
    
    // Add the cart items to the orders with date, time, and image
    const updatedOrders = cart.map(item => ({
      ...item,
      timestamp: invoiceData.timestamp, // Add date and time
      image: item.image || 'defaultImage.jpg' // Replace with the actual image property
    }));

    localStorage.setItem(`orders_${username}`, JSON.stringify([...orders, ...updatedOrders]));

    // Clear the cart
    localStorage.removeItem(`cart_${username}`);

    // Navigate to the orders page
    navigate('/orders');
  };

  return (
    <div className="invoice-container">
      <div className="invoice-card">
        <h2 className="invoice-title">Invoice</h2>
        <div className="invoice-header">
          <p><strong>Customer:</strong> {invoiceData.customerName}</p>
          <p><strong>Date:</strong> {invoiceData.date}</p>
        </div>

        <div className="invoice-items">
          <h4>Items:</h4>
          <ul>
            {invoiceData.items.map((item, index) => (
              <li key={index}>
                {item.name} (x{item.quantity}): ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className="invoice-total">
          <h4>Total: ₹{invoiceData.total}</h4>
        </div>

        <div className="invoice-buttons">
          <button className="btn btn-primary" onClick={generatePDF}>
            Save as PDF
          </button>
          <button className="btn btn-success" onClick={handlePaymentSuccess}>
            View Your Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
