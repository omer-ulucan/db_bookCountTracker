const XLSX = require('xlsx');
const path = require('path');

// Excel dosyasını okuma ve işleme
const inputFilePath = 'C:/Users/hbulu/OneDrive/Masaüstü/WEBSITES_4_JOB/amazonBookDB/excelFiles/input/kitapFisleri2.xlsx';
const workbook = XLSX.readFile(inputFilePath);

// Tüm tabloları al
const sheetNames = workbook.SheetNames;

// Tüm tablolardaki kitap isimlerini ve adetlerini al
const bookCounts = {};

for (let sheetName of sheetNames) {
  // Tabloyu seç
  const worksheet = workbook.Sheets[sheetName];

  // Kitap isimlerini ve adetlerini al
  const countsInSheet = getBookCounts(worksheet);

  // Tüm tablolardaki kitap isimlerini ve adetlerini birleştir
  for (let bookName in countsInSheet) {
    if (bookCounts[bookName]) {
      bookCounts[bookName] += countsInSheet[bookName];
    } else {
      bookCounts[bookName] = countsInSheet[bookName];
    }
  }
}

// Yeni bir Excel dosyası oluştur
const newWorkbook = XLSX.utils.book_new();
const newWorksheet = XLSX.utils.json_to_sheet(Object.keys(bookCounts).map(bookName => ({ Book: bookName, Count: bookCounts[bookName] })));

// Yeni Excel dosyasına verileri ekle
XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Book Counts');

// Yeni Excel dosyasını kaydet
const outputDirectory = 'C:/Users/hbulu/OneDrive/Masaüstü/WEBSITES_4_JOB/amazonBookDB/excelFiles/output';
const outputFileName = 'output.xlsx';
const outputFilePath = path.join(outputDirectory, outputFileName);
XLSX.writeFile(newWorkbook, outputFilePath);

console.log(`İşlem tamamlandı. Yeni Excel dosyası: ${outputFilePath}`);

// Kitap isimlerini ve adetlerini al
function getBookCounts(sheet) {
  const range = XLSX.utils.decode_range(sheet['!ref']);
  const bookCounts = {};

  // Tüm satırları kontrol et
  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
    const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: 1 }); // B sütunu (1 tabanlı index) kitap adını içerir
    const cell = sheet[cellAddress];

    // Hücre değerini al
    const bookName = cell ? cell.v : '';

    // Kitap ismini ve adedini sakla
    if (bookName) {
      if (bookCounts[bookName]) {
        bookCounts[bookName]++;
      } else {
        bookCounts[bookName] = 1;
      }
    }
  }

  return bookCounts;
}
