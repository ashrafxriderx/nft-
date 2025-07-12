import { Pool } from 'pg'

// Database configuration for local PostgreSQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'nft_terminal',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: false, // Disable SSL for local development
}

// Create connection pool
export const pool = new Pool(dbConfig)

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect()
    console.log('✅ Database connected successfully')
    client.release()
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// Execute SQL file
export async function executeSQLFile(sqlContent: string) {
  try {
    const client = await pool.connect()
    await client.query(sqlContent)
    client.release()
    console.log('✅ SQL executed successfully')
    return true
  } catch (error) {
    console.error('❌ SQL execution failed:', error)
    return false
  }
} 