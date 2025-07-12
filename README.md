# 🚀 NFT Terminal

All-in-one NFT launchpad on Monad for creators, influencers, and artists. Mint, gate, analyze, and scale your NFT projects with ease.

---

## 👤 Demo User

- **Email:** `demo@nftterminal.com`
- **Password:** (set your own or use the auth form)

---

## 📦 Features

- Mint and manage NFT collections
- Gated content for NFT holders
- Real-time analytics dashboard
- Whitelist management
- Token gating with access code generation
- Modern, responsive UI

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nft-terminal.git
cd nft-terminal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Environment Variables

Copy the example env file and fill in your database credentials:

```bash
cp env.example .env
```

Edit `.env` and set your PostgreSQL connection details.

### 4. Setup the Database

- Make sure PostgreSQL is running.
- Run the setup and seed scripts:

```bash
# Create tables
node scripts/setup-database.js
# Seed demo data
node scripts/seed-data.sql
```

Or run the SQL files manually in your PostgreSQL client:
- `scripts/create-tables.sql`
- `scripts/seed-data.sql`

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗂️ Project Structure

- `app/` — Next.js app routes (pages, API, etc.)
- `components/` — Reusable UI and feature components
- `lib/` — Database and utility functions
- `public/images/` — Collection and content images
- `scripts/` — Database setup and seed scripts

---

## 📝 Notes

- This project is for demo purposes. Some features (like settings) are not persisted.
- Tokens and demo data are static for demonstration.
- For production, update environment variables and secure your database.

---

## 💡 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE) 