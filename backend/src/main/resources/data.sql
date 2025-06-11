-- Insert roles
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
INSERT INTO roles(name) VALUES('ROLE_PROJECT_MANAGER');
INSERT INTO roles(name) VALUES('ROLE_CONSTRUCTION_MANAGER');
INSERT INTO roles(name) VALUES('ROLE_ENGINEER');
INSERT INTO roles(name) VALUES('ROLE_CONTRACTOR');
INSERT INTO roles(name) VALUES('ROLE_SUBCONTRACTOR');
INSERT INTO roles(name) VALUES('ROLE_FINANCE_MANAGER');

-- Insert admin user (password: admin123)
INSERT INTO users(username, email, password, first_name, last_name, job_title)
VALUES('admin', 'admin@edifice.com', '$2a$10$uV4hPRpZFS5vZXvOQrMItuA0BBKjIpSXb6vKWTCwuWLvLnLEVmZ4i', 'Admin', 'User', 'System Administrator');

-- Assign admin role to admin user
INSERT INTO user_roles(user_id, role_id) VALUES(1, 3);

-- Insert project manager user (password: manager123)
INSERT INTO users(username, email, password, first_name, last_name, job_title)
VALUES('manager', 'manager@edifice.com', '$2a$10$IYSAEtdnmrl4jX4GZD2TnuUzMjBPCQHs5aEUVtJ5jShEr7Bi6SQPK', 'Project', 'Manager', 'Senior Project Manager');

-- Assign project manager role to manager user
INSERT INTO user_roles(user_id, role_id) VALUES(2, 4);

-- Insert engineer user (password: engineer123)
INSERT INTO users(username, email, password, first_name, last_name, job_title)
VALUES('engineer', 'engineer@edifice.com', '$2a$10$FMFcavoT9nRTGPqrEJu1juUG6zxTqXCXPQqMvN8trgXLhIEYoG8EW', 'Senior', 'Engineer', 'Civil Engineer');

-- Assign engineer role to engineer user
INSERT INTO user_roles(user_id, role_id) VALUES(3, 6);

-- Insert sample projects
INSERT INTO projects(name, description, project_number, start_date, end_date, budget_amount, budget_spent, status, location_address, location_city, location_state, location_zip, location_country, project_manager_id, completion_percentage, created_at, updated_at)
VALUES('City Center Tower', 'Downtown high-rise commercial building construction', 'PRJ-2023-001', '2023-01-15', '2025-06-30', 25000000.00, 8750000.00, 'IN_PROGRESS', '123 Main St', 'Metropolis', 'CA', '90001', 'USA', 2, 35, CURRENT_DATE(), CURRENT_DATE());

INSERT INTO projects(name, description, project_number, start_date, end_date, budget_amount, budget_spent, status, location_address, location_city, location_state, location_zip, location_country, project_manager_id, completion_percentage, created_at, updated_at)
VALUES('Riverfront Residences', 'Luxury waterfront condominium complex', 'PRJ-2023-002', '2023-03-10', '2024-11-20', 18500000.00, 9250000.00, 'IN_PROGRESS', '456 River Dr', 'Riverside', 'CA', '92501', 'USA', 2, 50, CURRENT_DATE(), CURRENT_DATE());

INSERT INTO projects(name, description, project_number, start_date, end_date, budget_amount, budget_spent, status, location_address, location_city, location_state, location_zip, location_country, project_manager_id, completion_percentage, created_at, updated_at)
VALUES('Greenfield Hospital Expansion', 'Medical facility expansion and renovation', 'PRJ-2023-003', '2023-06-05', '2024-08-15', 32000000.00, 6400000.00, 'IN_PROGRESS', '789 Health Blvd', 'Greenfield', 'CA', '93927', 'USA', 2, 20, CURRENT_DATE(), CURRENT_DATE());

-- Add team members to projects
INSERT INTO project_team_members(project_id, user_id) VALUES(1, 3);
INSERT INTO project_team_members(project_id, user_id) VALUES(2, 3);
INSERT INTO project_team_members(project_id, user_id) VALUES(3, 3);

-- Insert sample tasks
INSERT INTO tasks(title, description, project_id, assigned_to, priority, status, due_date, start_date, created_at, updated_at)
VALUES('Foundation Planning', 'Plan and design the building foundation', 1, 3, 'HIGH', 'COMPLETED', '2023-02-15', '2023-01-20', CURRENT_DATE(), CURRENT_DATE());

INSERT INTO tasks(title, description, project_id, assigned_to, priority, status, due_date, start_date, created_at, updated_at)
VALUES('Structural Framework', 'Install main structural framework', 1, 3, 'HIGH', 'IN_PROGRESS', '2023-09-30', '2023-07-01', CURRENT_DATE(), CURRENT_DATE());

INSERT INTO tasks(title, description, project_id, assigned_to, priority, status, due_date, start_date, created_at, updated_at)
VALUES('Interior Design Planning', 'Complete interior design specifications', 2, 3, 'MEDIUM', 'IN_PROGRESS', '2023-10-15', '2023-09-01', CURRENT_DATE(), CURRENT_DATE());

-- Insert sample resources
INSERT INTO resources(name, description, type, daily_rate, quantity_available, quantity_allocated, status, created_at, updated_at)
VALUES('Tower Crane', 'Heavy duty tower crane for high-rise construction', 'EQUIPMENT', 1200.00, 2, 1, 'IN_USE', CURRENT_DATE(), CURRENT_DATE());

INSERT INTO resources(name, description, type, daily_rate, quantity_available, quantity_allocated, status, created_at, updated_at)
VALUES('Concrete', 'High-grade construction concrete', 'MATERIAL', 125.00, 500, 150, 'AVAILABLE', CURRENT_DATE(), CURRENT_DATE());

INSERT INTO resources(name, description, type, daily_rate, quantity_available, quantity_allocated, status, created_at, updated_at)
VALUES('Electrician Team', 'Skilled electrician crew', 'LABOR', 850.00, 3, 2, 'IN_USE', CURRENT_DATE(), CURRENT_DATE());

-- Insert sample issues (fix the INTERVAL syntax for H2)
INSERT INTO issues(title, description, project_id, reported_by, assigned_to, priority, status, type, reported_date, due_date, created_at, updated_at)
VALUES('Foundation Misalignment', 'Detected misalignment in the southwest corner of the foundation', 1, 2, 3, 'HIGH', 'IN_PROGRESS', 'DEFECT', CURRENT_DATE(), DATEADD('DAY', 7, CURRENT_DATE()), CURRENT_DATE(), CURRENT_DATE());

INSERT INTO issues(title, description, project_id, reported_by, assigned_to, priority, status, type, reported_date, due_date, created_at, updated_at)
VALUES('Material Delivery Delay', 'Critical steel components delayed by supplier', 2, 2, 2, 'CRITICAL', 'OPEN', 'MATERIAL_ISSUE', CURRENT_DATE(), DATEADD('DAY', 3, CURRENT_DATE()), CURRENT_DATE(), CURRENT_DATE());

INSERT INTO issues(title, description, project_id, reported_by, assigned_to, priority, status, type, reported_date, due_date, created_at, updated_at)
VALUES('Weather Damage to Site', 'Recent storm caused damage to temporary structures', 3, 2, 3, 'MEDIUM', 'OPEN', 'WEATHER_RELATED', CURRENT_DATE(), DATEADD('DAY', 5, CURRENT_DATE()), CURRENT_DATE(), CURRENT_DATE());
