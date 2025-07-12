import { NextResponse } from 'next/server'
import { testConnection } from '@/lib/database'
import { NFTDatabase } from '@/lib/db-utils'

export async function GET() {
  try {
    // Test database connection
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Get some sample data to verify everything works
    const users = await NFTDatabase.getUsers()
    const collections = await NFTDatabase.getCollections()
    const nfts = await NFTDatabase.getNFTs()

    // Default starting values
    const defaultUsers = 20
    const defaultCollections = 4
    const defaultNFTs = 45

    // Use default if empty, otherwise increment from default
    const usersCount = users.length === 0 ? defaultUsers : defaultUsers + users.length
    // Collections only increment when a new collection is added (start at 4)
    const collectionsCount = collections.length === 0 ? defaultCollections : defaultCollections + (collections.length)
    const nftsCount = nfts.length === 0 ? defaultNFTs : defaultNFTs + nfts.length

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      data: {
        usersCount,
        collectionsCount,
        nftsCount,
        sampleUsers: users.slice(0, 3),
        sampleCollections: collections.slice(0, 3)
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { error: 'Database test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 