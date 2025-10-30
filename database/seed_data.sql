-- Seed Data for Testing (Optional)
-- This file contains sample data for testing the application
-- Run this AFTER setting up the main schema

USE store_rating_db;

-- Insert sample normal users (Password for all: Test@123)
INSERT INTO users (name, email, password, address, role) VALUES
('John Michael Smith Anderson', 'john.smith@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '456 Main Street, New York, NY 10001', 'user'),
('Sarah Elizabeth Johnson Williams', 'sarah.johnson@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '789 Oak Avenue, Los Angeles, CA 90001', 'user'),
('Michael Robert Davis Martinez', 'michael.davis@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '321 Pine Road, Chicago, IL 60601', 'user');

-- Insert sample store owners (Password for all: Test@123)
INSERT INTO users (name, email, password, address, role) VALUES
('David Thomas Brown Jackson', 'david.brown@store.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '111 Business Boulevard, Houston, TX 77001', 'store_owner'),
('Jennifer Mary Wilson Garcia', 'jennifer.wilson@store.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '222 Commerce Street, Phoenix, AZ 85001', 'store_owner'),
('Christopher James Taylor Rodriguez', 'chris.taylor@store.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '333 Trade Center, Philadelphia, PA 19101', 'store_owner');

-- Insert sample stores
INSERT INTO stores (owner_id, name, email, address) VALUES
(4, 'Sunshine Electronics and Gadgets Store', 'contact@sunshine-electronics.com', '111 Business Boulevard, Houston, TX 77001'),
(5, 'Greenfield Organic Foods Market', 'info@greenfield-organic.com', '222 Commerce Street, Phoenix, AZ 85001'),
(6, 'Urban Fashion Clothing Boutique', 'hello@urban-fashion.com', '333 Trade Center, Philadelphia, PA 19101');

-- Insert sample ratings
-- User 1 (John) rates all stores
INSERT INTO ratings (user_id, store_id, rating) VALUES
(2, 1, 5),
(2, 2, 4),
(2, 3, 5);

-- User 2 (Sarah) rates two stores
INSERT INTO ratings (user_id, store_id, rating) VALUES
(3, 1, 4),
(3, 2, 5);

-- User 3 (Michael) rates one store
INSERT INTO ratings (user_id, store_id, rating) VALUES
(4, 1, 3);

-- Verify data was inserted
SELECT 'Users created:' as message, COUNT(*) as count FROM users;
SELECT 'Stores created:' as message, COUNT(*) as count FROM stores;
SELECT 'Ratings created:' as message, COUNT(*) as count FROM ratings;

-- Show store ratings
SELECT
    s.name as store_name,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as total_ratings
FROM stores s
LEFT JOIN ratings r ON s.id = r.store_id
GROUP BY s.id, s.name;
