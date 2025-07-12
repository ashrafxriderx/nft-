import { NextResponse } from 'next/server'
import { NFTDatabase } from '@/lib/db-utils'

export async function POST(req) {
  try {
    const data = await req.json()
    const { name, description, symbol, maxSupply, mintPrice, image } = data
    if (!name || !symbol || !maxSupply || !mintPrice || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    // For demo, use creator_id = 1 (replace with real user ID in production)
    const collection = await NFTDatabase.createCollection({
      name,
      description,
      symbol,
      max_supply: maxSupply,
      mint_price: mintPrice,
      image,
      creator_id: 1
    })
    return NextResponse.json({ status: 'success', collection })
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to create collection' }, { status: 500 })
  }
} 