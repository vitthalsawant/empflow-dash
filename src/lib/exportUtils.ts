import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Employee } from '@/pages/Dashboard';

// PDF Export Functions
export const exportToPDF = async (elementId: string, filename: string = 'analytics-report.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found for PDF export');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add image to PDF
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const exportAnalyticsToPDF = async (employees: Employee[]) => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add title
    pdf.setFontSize(20);
    pdf.text('Employee Analytics Report', 20, 30);
    
    // Add date
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Add summary statistics
    pdf.setFontSize(14);
    pdf.text('Summary Statistics', 20, 65);
    
    pdf.setFontSize(10);
    let yPosition = 80;
    
    const totalEmployees = employees.length;
    const departments = new Set(employees.map(emp => emp.department).filter(Boolean)).size;
    const positions = new Set(employees.map(emp => emp.position).filter(Boolean)).size;
    const avgSalary = employees.filter(emp => emp.salary).reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.filter(emp => emp.salary).length || 0;
    
    pdf.text(`Total Employees: ${totalEmployees}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Departments: ${departments}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Positions: ${positions}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Average Salary: ₹${avgSalary.toLocaleString('en-IN')}`, 20, yPosition);
    
    // Department breakdown
    yPosition += 20;
    pdf.setFontSize(14);
    pdf.text('Department Distribution', 20, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(10);
    
    const departmentData = employees.reduce((acc, emp) => {
      const dept = emp.department || "Unassigned";
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(departmentData).forEach(([dept, count]) => {
      pdf.text(`${dept}: ${count} employees`, 20, yPosition);
      yPosition += 8;
    });
    
    // Position breakdown
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.text('Position Distribution', 20, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(10);
    
    const positionData = employees.reduce((acc, emp) => {
      const pos = emp.position || "Unassigned";
      acc[pos] = (acc[pos] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(positionData).forEach(([pos, count]) => {
      pdf.text(`${pos}: ${count} employees`, 20, yPosition);
      yPosition += 8;
    });
    
    // Save the PDF
    const filename = `employee-analytics-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating analytics PDF:', error);
    throw error;
  }
};

// Excel Export Functions
export const exportToExcel = (employees: Employee[], filename: string = 'employees.xlsx') => {
  try {
    // Prepare data for Excel
    const excelData = employees.map(emp => ({
      'Name': emp.name,
      'Email': emp.email,
      'Phone': emp.phone || '',
      'Department': emp.department || '',
      'Position': emp.position || '',
      'Salary': emp.salary || '',
      'Hire Date': emp.hire_date ? new Date(emp.hire_date).toLocaleDateString() : '',
      'Created Date': new Date(emp.created_at).toLocaleDateString(),
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // Department
      { wch: 20 }, // Position
      { wch: 12 }, // Salary
      { wch: 12 }, // Hire Date
      { wch: 12 }, // Created Date
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');

    // Generate Excel file and download
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    saveAs(blob, filename);
    return true;
  } catch (error) {
    console.error('Error generating Excel file:', error);
    throw error;
  }
};

export const exportFilteredToExcel = (employees: Employee[], searchTerm: string = '') => {
  const filteredEmployees = searchTerm 
    ? employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : employees;
  
  const filename = searchTerm 
    ? `employees-filtered-${searchTerm}-${new Date().toISOString().split('T')[0]}.xlsx`
    : `employees-${new Date().toISOString().split('T')[0]}.xlsx`;
  
  return exportToExcel(filteredEmployees, filename);
};

// Utility function to format currency
export const formatCurrency = (amount: number | null): string => {
  if (!amount) return '-';
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Utility function to format date
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString();
};
