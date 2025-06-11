-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    profile_image_url VARCHAR(255),
    job_title VARCHAR(100),
    phone_number VARCHAR(20)
);

-- Create user_roles junction table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    project_number VARCHAR(50) UNIQUE,
    start_date DATE,
    end_date DATE,
    budget_amount DECIMAL(19, 2),
    budget_spent DECIMAL(19, 2),
    status VARCHAR(20),
    location_address VARCHAR(255),
    location_city VARCHAR(100),
    location_state VARCHAR(100),
    location_zip VARCHAR(20),
    location_country VARCHAR(100),
    cover_image_url VARCHAR(255),
    project_manager_id BIGINT,
    completion_percentage INT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (project_manager_id) REFERENCES users(id)
);

-- Create project_team_members junction table
CREATE TABLE IF NOT EXISTS project_team_members (
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id BIGINT NOT NULL,
    assigned_to BIGINT,
    priority VARCHAR(20),
    status VARCHAR(20),
    due_date DATE,
    start_date DATE,
    completion_date DATE,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20),
    daily_rate DECIMAL(19, 2),
    quantity_available INT,
    quantity_allocated INT,
    image_url VARCHAR(255),
    acquisition_date DATE,
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    status VARCHAR(20),
    created_at DATE,
    updated_at DATE
);

-- Create issues table
CREATE TABLE IF NOT EXISTS issues (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id BIGINT NOT NULL,
    reported_by BIGINT,
    assigned_to BIGINT,
    priority VARCHAR(20),
    status VARCHAR(20),
    type VARCHAR(50),
    location_details VARCHAR(255),
    due_date DATE,
    reported_date DATE,
    resolution_date DATE,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (reported_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);
