-- Drop existing tables if needed
DROP TABLE IF EXISTS notifications, donations, campaigns, patient_profiles, users;

-- User Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('PATIENT', 'DONOR', 'ADMIN') NOT NULL DEFAULT 'DONOR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Patient Profile Table
CREATE TABLE patient_profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    age INT,
    gender VARCHAR(10),
    medical_condition TEXT,
    location VARCHAR(255),
    document_urls JSON,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Campaign Table
CREATE TABLE campaigns (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    patient_name VARCHAR(255),
    relation VARCHAR(255),
    patient_age INT,
    patient_address VARCHAR(255),
    state VARCHAR(255),
    city VARCHAR(255),
    disease VARCHAR(255),
    hospital VARCHAR(255),
    doctor VARCHAR(255),
    duration INT,
    total_medical_cost DOUBLE,
    total_amount DOUBLE,
    end_date VARCHAR(255),
    aadhaar_path VARCHAR(255),
    pan_path VARCHAR(255),
    medical_report_path VARCHAR(255),
    description TEXT,
    status INT,
    amount_raised DOUBLE,
    title VARCHAR(255),
    campaign_url VARCHAR(255),
    cover_image_path VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign Key Constraint
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Donation Table
CREATE TABLE donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id BIGINT NOT NULL,
    donor_name VARCHAR(100) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    amount_inr DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(100) NOT NULL,
    payment_status INT NOT NULL,
    payment_gateway_id VARCHAR(100),
    donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);

-- Notification Table
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    type INT NOT NULL,
    status INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
