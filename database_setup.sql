-- Create Database
CREATE DATABASE IF NOT EXISTS lovehair_db;
USE lovehair_db;

-- 1. Create Products Table
-- img column is TEXT to support JSON array of multiple image URLs
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    img TEXT,
    category VARCHAR(100) DEFAULT 'Bundles',
    stock INT DEFAULT 0,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT DEFAULT 0,
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

-- 4. Create OTPs Table (For Sign-in)
CREATE TABLE IF NOT EXISTS otps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    category VARCHAR(100) DEFAULT 'Hair Extensions',
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    group_name VARCHAR(100) DEFAULT 'General',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 9. Create Banners Table
CREATE TABLE IF NOT EXISTS banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    image_url TEXT,
    link_url VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Create FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Create Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    transaction_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 12. Create Shipping Table
CREATE TABLE IF NOT EXISTS shipping (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    estimated_days VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- INSERT INITIAL DATA
-- -----------------------------------------------------------------------------

-- Insert Dummy Categories
INSERT INTO categories (name, group_name, description) VALUES
('Bundles', 'Hair Type', 'High-quality human hair bundles'),
('Wigs', 'Hair Type', 'Full lace and front lace wigs'),
('Frontals', 'Lace', 'Ear-to-ear lace frontals'),
('Closures', 'Lace', 'Top closures for perfect blending');

-- Insert Dummy Products (Note: img is now a JSON string array)
INSERT INTO products (name, price, old_price, img, category, reviews_count, stock) VALUES
('Love Hair 3 Bundles 9A Grade Brazilian Human Hair Water Wave', 86.00, 120.00, '["https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 124, 15),
('Queen Hair 10A Brazilian Hair Straight 3 Bundles Virgin Human Hair', 75.00, 95.00, '["https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 89, 4),
('Love Hair Body Wave 3 Bundles With Closure Brazilian Human Hair', 98.50, 140.00, '["https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 312, 22),
('Loose Deep Wave wig 13x4 Lace Front Human Hair Wigs', 120.00, 180.00, '["https://images.unsplash.com/photo-1562086254-20b16260bd7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Wig', 215, 3),
('Bone Straight 13x6 HD Lace Front Wig Free Part', 155.00, 230.00, '["https://images.unsplash.com/photo-1583001809873-c12ebba3152f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Wig', 93, 12),
('Indian Raw Deep Wave 3 Bundles with Frontal', 135.00, 190.00, '["https://images.unsplash.com/photo-1620331311520-246422ff83f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 56, 10),
('Glueless Kinky Curly HD Lace Wig', 145.00, 210.00, '["https://images.unsplash.com/photo-1595476108010-b4d1f8bc2b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Wig', 42, 8),
('613 Blonde Straight 3 Bundles with Closure', 125.00, 175.00, '["https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 88, 5),
('Short Bob Wig with Bangs Human Hair', 85.00, 110.00, '["https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Wig', 67, 15),
('Silky Straight Ponytail Extension', 45.00, 60.00, '["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Trending', 120, 30),
('Ombre Body Wave 13x4 Lace Frontal', 65.00, 90.00, '["https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Trending', 34, 20),
('Jerry Curly 4x4 Lace Closure Wig', 110.00, 150.00, '["https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Wig', 75, 7),
('Burmese Curly 3 Bundles High Quality', 105.00, 145.00, '["https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 92, 12),
('HD Lace Frontal 13x6 Straight Hair', 70.00, 100.00, '["https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Trending', 15, 25),
('Mongolian Afro Kinky Curly Bundles', 115.00, 160.00, '["https://images.unsplash.com/photo-1562086254-20b16260bd7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 110, 6),
('Burgundy Red Body Wave Wig', 130.00, 190.00, '["https://images.unsplash.com/photo-1583001809873-c12ebba3152f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Wig', 28, 4),
('Chocolate Brown Straight 3 Bundles', 95.00, 135.00, '["https://images.unsplash.com/photo-1620331311520-246422ff83f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Bundle', 45, 9),
('Natural Wave Clip-in Extensions 7pcs', 55.00, 80.00, '["https://images.unsplash.com/photo-1595476108010-b4d1f8bc2b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Trending', 63, 18),
('Super Double Drawn Bone Straight Wig', 220.00, 310.00, '["https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Wig', 156, 3),
('Deep Wave Frontal Closure 13x4', 75.00, 110.00, '["https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"]', 'Trending', 22, 14);

-- Insert Dummy Reviews
INSERT INTO reviews (text, name, company, rating) VALUES
('I love working with One love hair. The owners are kind and knowledgeable. The hair is beautiful and amazing quality.', 'Nicole', 'One Love Hair GmbH', 5),
('The clip-in extensions are fantastic. They blend seamlessly with my natural hair and the quality is absolutely top-notch.', 'Sarah', 'Verified Customer', 5),
('Exceptional customer service and gorgeous products. I will definitely be repurchasing from them again. Highly recommended!', 'Jessica', 'Salon Owner', 5);

-- Insert Site Settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('site_name', 'One Love Hair'),
('contact_number', '+1 (555) 000-0000'),
('promo_text', 'Free shipping on orders over $200! Use code LOVEHAIR20'),
('about_text', 'One Love Hair provides the highest quality 100% human hair extensions and wigs. Sourced directly from selective temples, our hair is natural, durable, and beautiful.'),
('address', '123 Hair Street, Beauty City, NY 10001'),
('facebook_link', 'https://facebook.com/onelovehair'),
('instagram_link', 'https://instagram.com/onelovehair');

-- Insert Dummy Banners
INSERT INTO banners (title, subtitle, image_url, link_url, order_index) VALUES
('Premium Brazilian Bundles', 'Get up to 30% off on all water wave bundles this week!', 'https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=1200&q=80', '/admin/products', 1),
('New HD Lace Collection', 'Invisible lace for the most natural look possible.', 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80', '/admin/products', 2);

-- Insert Dummy FAQs
INSERT INTO faqs (question, answer, order_index) VALUES
('How long does shipping take?', 'Standard shipping usually takes 3-5 business days within the US. International shipping can take 7-14 days.', 1),
('Can I dye the hair?', 'Yes, our hair is 100% human hair and can be dyed, bleached, and styled just like your own hair.', 2),
('What is your return policy?', 'We accept returns on unopened and unused products within 30 days of delivery. Due to hygiene reasons, hair extensions cannot be returned once the seal is broken.', 3);

-- Insert Dummy Shipping Methods
INSERT INTO shipping (name, cost, estimated_days) VALUES
('Standard Shipping', 10.00, '3-5 Business Days'),
('Express Shipping', 25.00, '1-2 Business Days'),
('International Shipping', 50.00, '7-14 Business Days');
