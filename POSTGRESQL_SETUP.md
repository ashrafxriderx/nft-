# PostgreSQL Setup Guide

This guide will help you set up a local PostgreSQL database for your NFT Terminal project.

## Prerequisites

1. **Install PostgreSQL** on your system:
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib`

2. **Start PostgreSQL service**:
   - **Windows**: PostgreSQL service should start automatically
   - **macOS**: `brew services start postgresql`
   - **Linux**: `sudo systemctl start postgresql`

## Step 1: Create Database and User

1. **Connect to PostgreSQL**:
   ```bash
   psql -U postgres
   ```

2. **Create the database**:
   ```sql
   CREATE DATABASE nft_terminal;
   ```

3. **Create a user** (optional, you can use postgres user):
   ```sql
   CREATE USER nft_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE nft_terminal TO nft_user;
   ```

4. **Exit psql**:
   ```sql
   \q
   ```

## Step 2: Configure Environment Variables

1. **Copy the environment file**:
   ```bash
   cp env.example .env.local
   ```

2. **Edit `.env.local`** with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=nft_terminal
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   ```

## Step 3: Install Dependencies

```bash
npm install
# or
pnpm install
```

## Step 4: Setup Database Tables and Sample Data

Run the database setup script:

```bash
npm run db:setup
# or
pnpm run db:setup
```

This will:
- Create all necessary tables
- Insert sample data
- Set up the database schema

## Step 5: Start the Development Server

```bash
npm run dev
# or
pnpm dev
```

Your application will be available at `http://localhost:3000`

## Database Schema

The setup creates the following tables:

- **users**: User accounts and profiles
- **collections**: NFT collections
- **nfts**: Individual NFTs
- **transactions**: NFT transactions
- **analytics**: Analytics data

## Troubleshooting

### Connection Issues

1. **Check if PostgreSQL is running**:
   ```bash
   # Windows
   services.msc  # Look for PostgreSQL service
   
   # macOS/Linux
   sudo systemctl status postgresql
   ```

2. **Verify connection**:
   ```bash
   psql -h localhost -U postgres -d nft_terminal
   ```

3. **Check firewall settings** (if applicable)

### Permission Issues

1. **Ensure the user has proper permissions**:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE nft_terminal TO your_user;
   ```

2. **Check pg_hba.conf** for authentication settings

### Port Issues

1. **Verify PostgreSQL is running on port 5432**:
   ```bash
   netstat -an | grep 5432
   ```

2. **Check if another service is using the port**

## Sample Data

The setup includes:
- 3 sample users
- 4 sample NFT collections
- Sample transactions and analytics data

## Production Deployment

For production, consider:
- Using a managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
- Setting up proper SSL certificates
- Configuring connection pooling
- Setting up database backups

## Useful Commands

```bash
# Connect to database
psql -U postgres -d nft_terminal

# List tables
\dt

# View table structure
\d table_name

# Reset database (if needed)
DROP DATABASE nft_terminal;
CREATE DATABASE nft_terminal;
npm run db:setup
``` 