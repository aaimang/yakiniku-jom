# 🔥 Yakiniku Jom

Welcome to **Yakiniku Jom**! A vibrant, premium, and mobile-friendly Japanese BBQ website built for Kuala Lumpur diners seeking Halal and dietary-friendly Japanese cuisine.

This site is fully responsive, interactive, and beautifully designed using modern web standards.

## 🚀 Features

1. **Kyoto Vermilion Red Aesthetic**: A gorgeous Rice Paper background coupled with energetic Kyoto Vermilion elements, soft shadows, and clean typography.
2. **Interactive Menu Filter (Vanilla JS)**: Filter our dishes in real-time by **Halal**, **Vegan**, and **No Seafood** tags.
3. **Deep Link Integrations**:
   - 📲 **WhatsApp Booking**: Directly message to ask or secure a table.
   - 🗺️ **Waze Routing**: Instantly open Waze navigation to our Kuala Lumpur location.

---

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla CSS3, and Vanilla JavaScript (ES6)
- **Tooling**: [Vite](https://vitejs.dev/) for blazing-fast local development and production building.
- **Hosting**: Deployed automatically to GitHub Pages via GitHub Actions!

---

## 💻 Local Development

Follow these steps to run the project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone git@github.com-work:aaimang/yakiniku-jom.git
   cd yakiniku-jom
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser to the local address shown in your terminal (usually `http://localhost:5173`).

4. **Build for production**:
   ```bash
   npm run build
   ```
   This generates a fast, optimized static bundle in the `dist/` directory.

---

## 🛸 Automated Deployment

This repository uses **GitHub Actions** to build and deploy the project to **GitHub Pages** automatically every time you push to the `main` branch.

The deployment configuration is defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
