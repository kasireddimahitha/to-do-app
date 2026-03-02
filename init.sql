CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
('Mahitha', 'mahitha@example.com'),
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');

CREATE TABLE execution_log (
    id SERIAL PRIMARY KEY,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE PROCEDURE log_execution()
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO execution_log DEFAULT VALUES;
END;
$$;

-- Schedule every 2 minutes
SELECT cron.schedule(
    'run-every-2-min',
    '*/2 * * * *',
    $$CALL log_execution();$$
);
