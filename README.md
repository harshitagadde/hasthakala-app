# Hasthakala 🌿

**AI-Driven Market Linkage and Smart Cataloging for Marginalized Artisans**

Hasthakala is a web/mobile-friendly application designed to help rural and traditional artisans present and sell their handmade products digitally. It brings product photography, voice-based descriptions, pricing support, catalog management, and payments into one simple workflow.

## ✨ Key Features

- 📸 **AI Photo Studio** – Upload or capture product images and improve their presentation.
- 🎙️ **Multilingual Voice Assistant** – Describe products using voice and support native-language interaction.
- 📝 **Smart Product Catalog** – Create and manage product information for online presentation.
- 💰 **Market Price Calculator** – Estimate a suitable selling price using material cost, making time, hourly rate, and market reference.
- 📱 **Payment QR** – Display a QR code for convenient direct digital payments.
- 🌍 **Artisan-Friendly Workflow** – Designed to reduce the need for advanced technical or typing skills.

## 🔄 How It Works

1. Capture or upload a product photo.
2. Improve the product image using the photo tools.
3. Describe the craft using voice or text.
4. Create the product catalog information.
5. Calculate a fair selling price.
6. Add payment details and QR.
7. Present the product to customers.

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Project Structure

```text
hasthakala-app-main/
├── index.html
├── css/
│   ├── main.css
│   └── photo-edit.css
├── js/
│   ├── app.js
│   ├── assistant.js
│   ├── calculator.js
│   ├── catalog.js
│   ├── photo-edit.js
│   └── voice.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── routes/
│       ├── auth.js
│       ├── products.js
│       └── translate.js
└── logo.jpeg
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Start the backend

Use the start script defined in `backend/package.json`:

```bash
npm start
```

If your project uses a development script instead:

```bash
npm run dev
```

### 4. Run the frontend

Open `index.html` using a local development server.

For example, with VS Code, use **Live Server** or another static development server.

## 📁 Main Modules

| Module | Purpose |
|---|---|
| `assistant.js` | Assistant interactions |
| `voice.js` | Voice input and speech functionality |
| `calculator.js` | Product price calculation |
| `catalog.js` | Product/catalog management |
| `photo-edit.js` | Product photo editing |
| `app.js` | Main application logic |
| `products.js` | Backend product routes |
| `translate.js` | Translation-related backend routes |
| `auth.js` | Authentication-related backend routes |

## 🎯 Project Vision

Hasthakala aims to create a simple digital bridge between **rural artisans and wider markets**, helping artisans showcase their traditional crafts while reducing common digital barriers.

> **Rural Hands • Global Reach**

## 🏆 Smart India Hackathon

**Problem Statement ID:** SIH26090  
**Problem Statement:** AI-Driven Market Linkage and Smart Cataloging Mobile application for Marginalized Artisans  
**Theme:** Culture and Heritage  
**Category:** Software  
**Team:** InnoveX

## 🔐 Configuration

Do not commit API keys, passwords, database credentials, or other secrets to GitHub.

If environment variables are required by your local setup, create a `.env` file locally and add it to `.gitignore`.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application.
5. Commit your changes with a clear message.
6. Open a pull request.

## 📄 License

Add your preferred project license here before publishing the repository.

---

**Hasthakala — empowering artisans through simple, accessible digital technology.**
