#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 NFT Terminal - PostgreSQL Quick Start')
console.log('==========================================\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...')
  const envExample = fs.readFileSync(path.join(process.cwd(), 'env.example'), 'utf8')
  fs.writeFileSync(envPath, envExample)
  console.log('✅ .env.local created from env.example')
  console.log('⚠️  Please edit .env.local with your PostgreSQL credentials\n')
} else {
  console.log('✅ .env.local already exists')
}

// Check if PostgreSQL is running
console.log('🔍 Checking PostgreSQL connection...')
async function checkDatabase() {
  try {
    const { Pool } = require('pg')
    const pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'nft_terminal',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl: false,
    })

    const client = await pool.connect()
    console.log('✅ PostgreSQL connection successful!')
    client.release()
    await pool.end()
  } catch (error) {
    console.log('❌ PostgreSQL connection failed')
    console.log('Please ensure:')
    console.log('1. PostgreSQL is installed and running')
    console.log('2. Database "nft_terminal" exists')
    console.log('3. Your credentials in .env.local are correct')
    console.log('\nError details:', error.message)
    process.exit(1)
  }
}

// Run database setup
console.log('\n📊 Setting up database tables and sample data...')
try {
  execSync('npm run db:setup', { stdio: 'inherit' })
  console.log('✅ Database setup completed!')
} catch (error) {
  console.log('❌ Database setup failed')
  console.log('Please run: npm run db:setup')
}

console.log('\n🎉 Setup complete!')
console.log('Next steps:')
console.log('1. Start the development server: npm run dev')
console.log('2. Open http://localhost:3000')
console.log('3. Check the database status in the dashboard')
console.log('\n📚 For more information, see POSTGRESQL_SETUP.md')

// Run the database check
checkDatabase() 