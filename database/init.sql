CREATE TABLE IF NOT EXISTS painting_requests (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(150),
    phone VARCHAR(30),
    painting_type VARCHAR(80) NOT NULL,
    medium VARCHAR(80) NOT NULL,
    size VARCHAR(10) NOT NULL,
    description TEXT,
    estimated_price NUMERIC(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
