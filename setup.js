#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 NFT Terminal Setup Wizard')
console.log('=============================\n')

// Check if .env exists
const envPath = path.join(__dirname, '.env')
const envExamplePath = path.join(__dirname, 'env.example')

if (!fs.existsSync(envPath)) {
  console.log('📝 Setting up environment variables...')
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath)
    console.log('✅ Created .env file from template')
    console.log('⚠️  Please edit .env with your database credentials before continuing')
    console.log('   - For local PostgreSQL: Set DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD')
    console.log('   - For Supabase: Set DATABASE_URL')
    console.log('\n')
  } else {
    console.log('❌ env.example not found. Please create .env manually')
    process.exit(1)
  }
} else {
  console.log('✅ .env file already exists')
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules')
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...')
  try {
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' })
    console.log('✅ Dependencies installed successfully')
  } catch (error) {
    console.log('❌ Failed to install dependencies')
    process.exit(1)
  }
} else {
  console.log('✅ Dependencies already installed')
}

console.log('\n🎯 Setup Options:')
console.log('1. Run with demo data (no database required)')
console.log('2. Set up database and run with real data')
console.log('3. Exit setup')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('\nChoose an option (1-3): ', (answer) => {
  switch (answer.trim()) {
    case '1':
      console.log('\n🎉 Starting NFT Terminal in demo mode...')
      console.log('📱 Your app will be available at: http://localhost:3000')
      console.log('🔑 Demo credentials:')
      console.log('   - Email: demo@nftterminal.com')
      console.log('   - Password: demo123')
      console.log('\n🚀 Starting development server...')
      try {
        execSync('npm run dev', { stdio: 'inherit' })
      } catch (error) {
        console.log('❌ Failed to start development server')
      }
      break
      
    case '2':
      console.log('\n🗄️  Setting up database...')
      console.log('⚠️  Make sure your database is running and .env is configured')
      rl.question('Press Enter when ready to continue...', () => {
        try {
          execSync('node scripts/setup-database.js', { stdio: 'inherit' })
          console.log('\n🎉 Database setup completed!')
          console.log('🚀 Starting development server...')
          execSync('npm run dev', { stdio: 'inherit' })
        } catch (error) {
          console.log('❌ Database setup failed. Please check your configuration.')
        }
      })
      break
      
    case '3':
      console.log('\n👋 Setup cancelled. You can run the following commands manually:')
      console.log('   npm run dev          # Start in demo mode')
      console.log('   node scripts/setup-database.js  # Set up database')
      break
      
    default:
      console.log('\n❌ Invalid option. Please choose 1, 2, or 3.')
  }
  
  rl.close()
}) 