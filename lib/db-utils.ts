import { pool } from './database'

// Common database operations
export class DatabaseUtils {
  // Get all records from a table
  static async getAll(tableName: string) {
    const query = `SELECT * FROM ${tableName}`
    const result = await pool.query(query)
    return result.rows
  }

  // Get a single record by ID
  static async getById(tableName: string, id: number) {
    const query = `SELECT * FROM ${tableName} WHERE id = $1`
    const result = await pool.query(query, [id])
    return result.rows[0]
  }

  // Insert a new record
  static async insert(tableName: string, data: Record<string, any>) {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ')
    
    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`
    const result = await pool.query(query, values)
    return result.rows[0]
  }

  // Update a record
  static async update(tableName: string, id: number, data: Record<string, any>) {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ')
    
    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${values.length + 1} RETURNING *`
    const result = await pool.query(query, [...values, id])
    return result.rows[0]
  }

  // Delete a record
  static async delete(tableName: string, id: number) {
    const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`
    const result = await pool.query(query, [id])
    return result.rows[0]
  }

  // Execute custom query
  static async query(sql: string, params: any[] = []) {
    const result = await pool.query(sql, params)
    return result.rows
  }

  // Check if table exists
  static async tableExists(tableName: string) {
    const query = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )
    `
    const result = await pool.query(query, [tableName])
    return result.rows[0].exists
  }

  // Get table structure
  static async getTableStructure(tableName: string) {
    const query = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `
    const result = await pool.query(query, [tableName])
    return result.rows
  }
}

// Example usage functions for NFT Terminal
export const NFTDatabase = {
  // User operations
  async getUsers() {
    return DatabaseUtils.getAll('users')
  },

  async getUserById(id: number) {
    return DatabaseUtils.getById('users', id)
  },

  async createUser(userData: { username: string; email: string; wallet_address?: string }) {
    return DatabaseUtils.insert('users', {
      ...userData,
      created_at: new Date(),
      updated_at: new Date()
    })
  },

  // Collection operations
  async getCollections() {
    return DatabaseUtils.getAll('collections')
  },

  async getCollectionById(id: number) {
    return DatabaseUtils.getById('collections', id)
  },

  async createCollection(collectionData: {
    name: string;
    description: string;
    creator_id: number;
    contract_address?: string;
  }) {
    return DatabaseUtils.insert('collections', {
      ...collectionData,
      created_at: new Date(),
      updated_at: new Date()
    })
  },

  // NFT operations
  async getNFTs() {
    return DatabaseUtils.getAll('nfts')
  },

  async getNFTById(id: number) {
    return DatabaseUtils.getById('nfts', id)
  },

  async getNFTsByCollection(collectionId: number) {
    return DatabaseUtils.query('SELECT * FROM nfts WHERE collection_id = $1', [collectionId])
  },

  // Transaction operations
  async getTransactions() {
    return DatabaseUtils.getAll('transactions')
  },

  async getTransactionsByNFT(nftId: number) {
    return DatabaseUtils.query('SELECT * FROM transactions WHERE nft_id = $1 ORDER BY created_at DESC', [nftId])
  },

  // Analytics operations
  async getAnalytics() {
    return DatabaseUtils.getAll('analytics')
  },

  async getCollectionAnalytics(collectionId: number) {
    return DatabaseUtils.query('SELECT * FROM analytics WHERE collection_id = $1', [collectionId])
  }
} 