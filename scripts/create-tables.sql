-- NFT Terminal Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50),
    email VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    banner_url TEXT,
    contract_address VARCHAR(100) UNIQUE NOT NULL,
    creator_id INTEGER REFERENCES users(id),
    total_supply INTEGER DEFAULT 0,
    floor_price DECIMAL(20, 8),
    volume_traded DECIMAL(20, 8) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NFTs table
CREATE TABLE IF NOT EXISTS nfts (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR(255) NOT NULL,
    collection_id INTEGER REFERENCES collections(id),
    owner_id INTEGER REFERENCES users(id),
    name VARCHAR(255),
    description TEXT,
    image_url TEXT,
    metadata_url TEXT,
    attributes JSONB,
    rarity_score DECIMAL(10, 4),
    last_sale_price DECIMAL(20, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(collection_id, token_id)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    nft_id INTEGER REFERENCES nfts(id),
    from_user_id INTEGER REFERENCES users(id),
    to_user_id INTEGER REFERENCES users(id),
    transaction_hash VARCHAR(100) UNIQUE NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- 'sale', 'transfer', 'mint'
    price DECIMAL(20, 8),
    currency VARCHAR(10) DEFAULT 'ETH',
    gas_fee DECIMAL(20, 8),
    block_number BIGINT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Market listings table
CREATE TABLE IF NOT EXISTS market_listings (
    id SERIAL PRIMARY KEY,
    nft_id INTEGER REFERENCES nfts(id),
    seller_id INTEGER REFERENCES users(id),
    price DECIMAL(20, 8) NOT NULL,
    currency VARCHAR(10) DEFAULT 'ETH',
    listing_type VARCHAR(20) DEFAULT 'fixed', -- 'fixed', 'auction'
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_collections_contract_address ON collections(contract_address);
CREATE INDEX IF NOT EXISTS idx_nfts_collection_id ON nfts(collection_id);
CREATE INDEX IF NOT EXISTS idx_nfts_owner_id ON nfts(owner_id);
CREATE INDEX IF NOT EXISTS idx_transactions_nft_id ON transactions(nft_id);
CREATE INDEX IF NOT EXISTS idx_transactions_hash ON transactions(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_market_listings_nft_id ON market_listings(nft_id);
CREATE INDEX IF NOT EXISTS idx_market_listings_active ON market_listings(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (safe version)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
        CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_collections_updated_at') THEN
        CREATE TRIGGER update_collections_updated_at
        BEFORE UPDATE ON collections
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_nfts_updated_at') THEN
        CREATE TRIGGER update_nfts_updated_at
        BEFORE UPDATE ON nfts
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END;
$$;
