-- Insert roles
INSERT INTO roles(name) VALUES('ROLE_USER') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_MODERATOR') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_PROJECT_MANAGER') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_CONSTRUCTION_MANAGER') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_ENGINEER') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_CONTRACTOR') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_SUBCONTRACTOR') ON CONFLICT DO NOTHING;
INSERT INTO roles(name) VALUES('ROLE_FINANCE_MANAGER') ON CONFLICT DO NOTHING;

-- Insert admin user (password: admin123)
INSERT INTO users(username, email, password, first_name, last_name, job_title)
VALUES('admin', 'admin@edifice.com', '$2a$10$uV4hPRpZFS5vZXvOQrMItuA0BBKjIpSXb6vKWTCwuWLvLnLEVmZ4i', 'Admin', 'User', 'System Administrator')
ON CONFLICT DO NOTHING;

-- Assign admin role to admin user
INSERT INTO user_roles(user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;

-- Insert project manager user (password: manager123)
INSERT INTO users(username, email, password, first_name, last_name, job_title)
VALUES('manager', 'manager@edifice.com', '$2a$10$IYSAEtdnmrl4jX4GZD2TnuUzMjBPCQHs5aEUVtJ5jShEr7Bi6SQPK', 'Project', 'Manager', 'Senior Project Manager')
ON CONFLICT DO NOTHING;

-- Assign project manager role to manager user
INSERT INTO user_roles(user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'manager' AND r.name = 'ROLE_PROJECT_MANAGER'
ON CONFLICT DO NOTHING;

-- Insert engineer user (password: engineer123)
INSERT INTO users(username, email, password, first_name, last_name, job_title)
VALUES('engineer', 'engineer@edifice.com', '$2a$10$FMFcavoT9nRTGPqrEJu1juUG6zxTqXCXPQqMvN8trgXLhIEYoG8EW', 'Senior', 'Engineer', 'Civil Engineer')
ON CONFLICT DO NOTHING;

-- Assign engineer role to engineer user
INSERT INTO user_roles(user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'engineer' AND r.name = 'ROLE_ENGINEER'
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects(name, description, project_number, start_date, end_date, budget_amount, budget_spent, status, location_address, location_city, location_state, location_zip, location_country, project_manager_id, completion_percentage, created_at, updated_at)
SELECT 'City Center Tower', 'Downtown high-rise commercial building construction', 'PRJ-2023-001', '2023-01-15', '2025-06-30', 25000000.00, 8750000.00, 'IN_PROGRESS', '123 Main St', 'Metropolis', 'CA', '90001', 'USA', u.id, 35, CURRENT_DATE, CURRENT_DATE
FROM users u WHERE u.username = 'manager'
ON CONFLICT DO NOTHING;

INSERT INTO projects(name, description, project_number, start_date, end_date, budget_amount, budget_spent, status, location_address, location_city, location_state, location_zip, location_country, project_manager_id, completion_percentage, created_at, updated_at)
SELECT 'Riverfront Residences', 'Luxury waterfront condominium complex', 'PRJ-2023-002', '2023-03-10', '2024-11-20', 18500000.00, 9250000.00, 'IN_PROGRESS', '456 River Dr', 'Riverside', 'CA', '92501', 'USA', u.id, 50, CURRENT_DATE, CURRENT_DATE
FROM users u WHERE u.username = 'manager'
ON CONFLICT DO NOTHING;

INSERT INTO projects(name, description, project_number, start_date, end_date, budget_amount, budget_spent, status, location_address, location_city, location_state, location_zip, location_country, project_manager_id, completion_percentage, created_at, updated_at)
SELECT 'Greenfield Hospital Expansion', 'Medical facility expansion and renovation', 'PRJ-2023-003', '2023-06-05', '2024-08-15', 32000000.00, 6400000.00, 'IN_PROGRESS', '789 Health Blvd', 'Greenfield', 'CA', '93927', 'USA', u.id, 20, CURRENT_DATE, CURRENT_DATE
FROM users u WHERE u.username = 'manager'
ON CONFLICT DO NOTHING;

-- Add team members to projects
INSERT INTO project_team_members(project_id, user_id)
SELECT p.id, u.id
FROM projects p, users u
WHERE p.project_number = 'PRJ-2023-001' AND u.username = 'engineer'
ON CONFLICT DO NOTHING;

INSERT INTO project_team_members(project_id, user_id)
SELECT p.id, u.id
FROM projects p, users u
WHERE p.project_number = 'PRJ-2023-002' AND u.username = 'engineer'
ON CONFLICT DO NOTHING;

INSERT INTO project_team_members(project_id, user_id)
SELECT p.id, u.id
FROM projects p, users u
WHERE p.project_number = 'PRJ-2023-003' AND u.username = 'engineer'
ON CONFLICT DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks(title, description, project_id, assigned_to, priority, status, due_date, start_date, created_at, updated_at)
SELECT 'Foundation Planning', 'Plan and design the building foundation', p.id, u.id, 'HIGH', 'COMPLETED', '2023-02-15', '2023-01-20', CURRENT_DATE, CURRENT_DATE
FROM projects p, users u
WHERE p.project_number = 'PRJ-2023-001' AND u.username = 'engineer'
ON CONFLICT DO NOTHING;

INSERT INTO tasks(title, description, project_id, assigned_to, priority, status, due_date, start_date, created_at, updated_at)
SELECT 'Structural Framework', 'Install main structural framework', p.id, u.id, 'HIGH', 'IN_PROGRESS', '2023-09-30', '2023-07-01', CURRENT_DATE, CURRENT_DATE
FROM projects p, users u
WHERE p.project_number = 'PRJ-2023-001' AND u.username = 'engineer'
ON CONFLICT DO NOTHING;

INSERT INTO tasks(title, description, project_id, assigned_to, priority, status, due_date, start_date, created_at, updated_at)
SELECT 'Interior Design Planning', 'Complete interior design specifications', p.id, u.id, 'MEDIUM', 'IN_PROGRESS', '2023-10-15', '2023-09-01', CURRENT_DATE, CURRENT_DATE
FROM projects p, users u
WHERE p.project_number = 'PRJ-2023-002' AND u.username = 'engineer'
ON CONFLICT DO NOTHING;

-- Insert sample resources
INSERT INTO resources(name, description, type, daily_rate, quantity_available, quantity_allocated, status, created_at, updated_at)
VALUES('Tower Crane', 'Heavy duty tower crane for high-rise construction', 'EQUIPMENT', 1200.00, 2, 1, 'IN_USE', CURRENT_DATE, CURRENT_DATE)
ON CONFLICT DO NOTHING;

INSERT INTO resources(name, description, type, daily_rate, quantity_available, quantity_allocated, status, created_at, updated_at)
VALUES('Concrete', 'High-grade construction concrete', 'MATERIAL', 125.00, 500, 150, 'AVAILABLE', CURRENT_DATE, CURRENT_DATE)
ON CONFLICT DO NOTHING;

INSERT INTO resources(name, description, type, daily_rate, quantity_available, quantity_allocated, status, created_at, updated_at)
VALUES('Electrician Team', 'Skilled electrician crew', 'LABOR', 850.00, 3, 2, 'IN_USE', CURRENT_DATE, CURRENT_DATE)
ON CONFLICT DO NOTHING;

-- Insert sample issues
INSERT INTO issues(title, description, project_id, reported_by, assigned_to, priority, status, type, reported_date, due_date, created_at, updated_at)
SELECT 'Foundation Misalignment', 'Detected misalignment in the southwest corner of the foundation', p.id, m.id, e.id, 'HIGH', 'IN_PROGRESS', 'DEFECT', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE, CURRENT_DATE
FROM projects p, users m, users e
WHERE p.project_number = 'PRJ-2023-001' AND m.username = 'manager' AND e.username = 'engineer'
ON CONFLICT DO NOTHING;

INSERT INTO issues(title, description, project_id, reported_by, assigned_to, priority, status, type, reported_date, due_date, created_at, updated_at)
SELECT 'Material Delivery Delay', 'Critical steel components delayed by supplier', p.id, m.id, m.id, 'CRITICAL', 'OPEN', 'MATERIAL_ISSUE', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', CURRENT_DATE, CURRENT_DATE
FROM projects p, users m
WHERE p.project_number = 'PRJ-2023-002' AND m.username = 'manager'
ON CONFLICT DO NOTHING;

INSERT INTO issues(title, description, project_id, reported_by, assigned_to, priority, status, type, reported_date, due_date, created_at, updated_at)
SELECT 'Weather Damage to Site', 'Recent storm caused damage to temporary structures', p.id, m.id, e.id, 'MEDIUM', 'OPEN', 'WEATHER_RELATED', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days', CURRENT_DATE, CURRENT_DATE
FROM projects p, users m, users e
WHERE p.project_number = 'PRJ-2023-003' AND m.username = 'manager' AND e.username = 'engineer'
ON CONFLICT DO NOTHING;
