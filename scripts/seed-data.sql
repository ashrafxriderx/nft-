-- Sample data for NFT Terminal

-- Insert sample users
INSERT INTO users (wallet_address, username, email, bio) VALUES
('0x1234567890123456789012345678901234567890', 'cryptoartist', 'artist@example.com', 'Digital artist creating unique NFT collections'),
('0x2345678901234567890123456789012345678901', 'nftcollector', 'collector@example.com', 'Passionate NFT collector and trader'),
('0x3456789012345678901234567890123456789012', 'blockchaindev', 'dev@example.com', 'Blockchain developer and NFT enthusiast')
ON CONFLICT (wallet_address) DO NOTHING;

-- Insert sample collections
INSERT INTO collections (name, description, contract_address, creator_id, total_supply, floor_price, volume_traded) VALUES
('Crypto Punks Clone', 'A collection inspired by the famous CryptoPunks', '0x1111111111111111111111111111111111111111', 1, 10000, 0.5, 1250.75),
('Digital Landscapes', 'Beautiful digital landscape artworks', '0x2222222222222222222222222222222222222222', 1, 500, 0.1, 45.25),
('Abstract Emotions', 'Abstract art representing human emotions', '0x3333333333333333333333333333333333333333', 2, 1000, 0.25, 320.50),
('Pixel Warriors', 'Retro-style pixel art warriors', '0x4444444444444444444444444444444444444444', 3, 2500, 0.08, 180.30)
ON CONFLICT (contract_address) DO NOTHING;

-- Insert sample NFTs
INSERT INTO nfts (token_id, collection_id, owner_id, name, description, rarity_score, last_sale_price) VALUES
('1', 1, 2, 'Punk #1', 'A rare punk with unique attributes', 95.5, 2.5),
('2', 1, 3, 'Punk #2', 'Another unique punk character', 87.2, 1.8),
('1', 2, 1, 'Mountain Sunrise', 'A beautiful mountain landscape at sunrise', 78.9, 0.3),
('2', 2, 2, 'Ocean Waves', 'Peaceful ocean waves digital art', 82.1, 0.4),
('1', 3, 3, 'Joy in Blue', 'Abstract representation of joy', 91.3, 0.7),
('1', 4, 1, 'Warrior King', 'The strongest pixel warrior', 96.8, 0.15)
ON CONFLICT (collection_id, token_id) DO NOTHING;

-- Insert sample transactions (corrected hash lengths)
INSERT INTO transactions (nft_id, from_user_id, to_user_id, transaction_hash, transaction_type, price, gas_fee, block_number) VALUES
(1, 1, 2, '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'sale', 2.5, 0.005, 18500000),
(2, 1, 3, '0x2345678901bcdef02345678901bcdef02345678901bcdef02345678901bcdef0', 'sale', 1.8, 0.004, 18500100),
(3, 1, 1, '0x3456789012cdef123456789012cdef123456789012cdef123456789012cdef12', 'mint', 0.0, 0.003, 18499500),
(4, 1, 2, '0x4567890123def234567890123def234567890123def234567890123def2345', 'sale', 0.4, 0.002, 18500200)
ON CONFLICT (transaction_hash) DO NOTHING;

-- Insert sample market listings
INSERT INTO market_listings (nft_id, seller_id, price, listing_type, end_date, is_active) VALUES
(5, 3, 0.8, 'fixed', NOW() + INTERVAL '7 days', true),
(6, 1, 0.2, 'auction', NOW() + INTERVAL '3 days', true);
