require("dotenv").config({ path: ".env.local" })
const fs = require("fs")
const path = require("path")
const { Pool } = require("pg")

// Database configuration for local PostgreSQL
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "1234",
  ssl: false, // Disable SSL for local development
}

const targetDatabase = process.env.DB_NAME || "nft_terminal"

async function createDatabaseIfNotExists() {
  // Connect to postgres database first to create our target database
  const adminPool = new Pool({
    ...dbConfig,
    database: "postgres", // Connect to default postgres database
  })

  try {
    const client = await adminPool.connect()

    // Check if database exists
    const result = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [targetDatabase])

    if (result.rows.length === 0) {
      console.log(`📦 Creating database "${targetDatabase}"...`)
      await client.query(`CREATE DATABASE "${targetDatabase}"`)
      console.log(`✅ Database "${targetDatabase}" created successfully`)
    } else {
      console.log(`✅ Database "${targetDatabase}" already exists`)
    }

    client.release()
  } catch (error) {
    console.error("❌ Failed to create database:", error.message)
    throw error
  } finally {
    await adminPool.end()
  }
}

async function setupDatabase() {
  try {
    console.log("🚀 Setting up NFT Terminal database...")
    console.log("🔧 Configuration:")
    console.log(`   Host: ${dbConfig.host}`)
    console.log(`   Port: ${dbConfig.port}`)
    console.log(`   User: ${dbConfig.user}`)
    console.log(`   Database: ${targetDatabase}`)

    // Create database if it doesn't exist
    await createDatabaseIfNotExists()

    // Now connect to our target database
    const pool = new Pool({
      ...dbConfig,
      database: targetDatabase,
    })

    const client = await pool.connect()
    console.log("✅ Connected to target database successfully")

    // Read and execute create-tables.sql
    const createTablesPath = path.join(__dirname, "create-tables.sql")
    if (!fs.existsSync(createTablesPath)) {
      throw new Error(`create-tables.sql not found at ${createTablesPath}`)
    }

    const createTablesSQL = fs.readFileSync(createTablesPath, "utf8")

    console.log("📋 Creating database tables...")
    await client.query(createTablesSQL)
    console.log("✅ Tables created successfully")

    // Read and execute seed-data.sql with better error handling
    const seedDataPath = path.join(__dirname, "seed-data.sql")
    if (fs.existsSync(seedDataPath)) {
      const seedDataSQL = fs.readFileSync(seedDataPath, "utf8")

      console.log("🌱 Seeding database with sample data...")

      // Split the SQL into individual statements for better error reporting
      const statements = seedDataSQL
        .split(";")
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"))

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i]
        if (statement) {
          try {
            console.log(`   Executing statement ${i + 1}/${statements.length}...`)
            await client.query(statement)
          } catch (error) {
            console.error(`❌ Error in statement ${i + 1}:`)
            console.error(`Statement: ${statement.substring(0, 100)}...`)
            console.error(`Error: ${error.message}`)
            throw error
          }
        }
      }

      console.log("✅ Sample data inserted successfully")
    } else {
      console.log("⚠️  seed-data.sql not found, skipping sample data")
    }

    client.release()
    await pool.end()

    console.log("🎉 Database setup completed successfully!")
    console.log("📊 Your NFT Terminal is ready with sample data:")
    console.log("   - 3 sample users")
    console.log("   - 4 sample collections")
    console.log("   - Sample transactions and analytics")
  } catch (error) {
    console.error("❌ Database setup failed:", error.message)
    console.error("💡 Troubleshooting tips:")
    console.error("   1. Make sure PostgreSQL is running")
    console.error("   2. Check your .env.local file exists and has correct values")
    console.error("   3. Verify your database credentials")
    console.error("   4. Ensure create-tables.sql exists in the scripts folder")
    process.exit(1)
  }
}

setupDatabase()
