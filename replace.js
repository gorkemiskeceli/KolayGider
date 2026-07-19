const fs = require('fs');
const path = require('path');

const files = [
  'src/store/slices/budgetSlice.js',
  'src/store/slices/auditSlice.js',
  'src/pages/Register.jsx',
  'src/pages/Login.jsx',
  'src/store/slices/businessSlice.js',
  'src/store/slices/categorySlice.js',
  'src/store/slices/expenseSlice.js',
  'src/pages/admin/AdminDashboard.jsx',
  'src/pages/admin/SubscriptionsPage.jsx',
  'src/pages/admin/SupportTicketsPage.jsx',
  'src/store/slices/recurringSlice.js',
  'src/store/slices/authSlice.js'
];

files.forEach(file => {
  const filePath = path.resolve(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/http:\/\/localhost:3000/g, 'https://kolaygider-api.onrender.com');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Replaced in ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
