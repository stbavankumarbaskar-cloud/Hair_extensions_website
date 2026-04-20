-- Create Database
CREATE DATABASE IF NOT EXISTS lovehair_db;
USE lovehair_db;

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    img VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Bundles',
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150),
    rating INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(150) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- INSERT DUMMY DATA FOR FRONT PAGE & ADMIN DASHBOARD
-- -----------------------------------------------------------------------------

-- Insert Dummy Products
INSERT INTO products (name, price, old_price, img, category, reviews_count) VALUES
('Love Hair 3 Bundles 9A Grade Brazilian Human Hair Water Wave', 86.00, 120.00, 'https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Bundle', 124),
('Queen Hair 10A Brazilian Hair Straight 3 Bundles Virgin Human Hair', 75.00, 95.00, 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Bundle', 89),
('Love Hair Body Wave 3 Bundles With Closure Brazilian Human Hair', 98.50, 140.00, 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Bundle', 312),
('Loose Deep Wave wig 13x4 Lace Front Human Hair Wigs', 120.00, 180.00, 'https://images.unsplash.com/photo-1562086254-20b16260bd7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Wig', 215),
('Bone Straight 13x6 HD Lace Front Wig Free Part', 155.00, 230.00, 'https://images.unsplash.com/photo-1583001809873-c12ebba3152f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Wig', 93);

-- Insert Dummy Reviews
INSERT INTO reviews (text, name, company, rating) VALUES
('I love working with One love hair. The owners are kind and knowledgeable. The hair is beautiful and amazing quality.', 'Nicole', 'One Love Hair GmbH', 5),
('The clip-in extensions are fantastic. They blend seamlessly with my natural hair and the quality is absolutely top-notch.', 'Sarah', 'Verified Customer', 5),
('Exceptional customer service and gorgeous products. I will definitely be repurchasing from them again. Highly recommended!', 'Jessica', 'Salon Owner', 5);

-- Insert Dummy Orders for Admin
INSERT INTO orders (order_number, customer_name, product_name, amount, status) VALUES
('#ORD-1001', 'Emma Watson', '100% Brazilian Human Hair Bundles', 345.00, 'Processing'),
('#ORD-1002', 'Sophia Turner', 'Loose Deep Wave wig 13x4 Lace', 120.00, 'Completed'),
('#ORD-1003', 'Mia Johnson', 'Body Wave Lace Front Wigs', 135.00, 'Pending'),
('#ORD-1004', 'Isabella Smith', 'Bone Straight 13x6 HD Lace Front Wig', 155.00, 'Completed'),
('#ORD-1005', 'Olivia Williams', 'Indian Deep Wave 3 Bundles', 118.00, 'Processing');
