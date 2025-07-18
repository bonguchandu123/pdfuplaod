## 📄 PDF Upload Portal (MERN Stack)
A full-stack web application to securely upload, view, and manage PDFs using the MERN stack. This portal allows users to upload PDF files with metadata, preview them, and categorize for easy access.



<img width="1896" height="873" alt="Image" src="https://github.com/user-attachments/assets/74863b09-7506-4350-8ec7-3808d2a52420" />

## 🚀 Features
🧾 Upload PDF files with title & description

🔒 CLERK_BASED authentication

☁️ Cloudinary or local disk storage for PDFs

📖 View PDFs directly in the browser

📂 Organized listing with filters/search

🧼 Clean and intuitive UI using TailwindCSS


## 🛠 Tech Stack
Frontend: React + TailwindCSS

Backend: Node.js + Express

Database: MongoDB (with Mongoose)

Storage: Cloudinary / Multer (local disk optional)

Authentication: Clerk

PDF Viewer: react-pdf / pdf.js

##  Folder Structur
```
pdf-upload-portal/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.js
├── .env
└── README.md
```
## ⚙️ Environment Variables (.env)
```
# Backend
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pdfportal
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend
REACT_APP_API_URL=http://localhost:5000
```


## 1️⃣ Clone the Repository
```
git clone https://github.com/yourusername/pdf-upload-portal.git
cd pdf-upload-portal
```


