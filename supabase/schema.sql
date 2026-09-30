-- ==============================================================================
-- NEXA BANK — QueueLess Database Schema for Supabase
-- ==============================================================================

-- 1. Create Branches Table
CREATE TABLE IF NOT EXISTS public.branches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    operating_hours TEXT NOT NULL DEFAULT '08:00 - 15:00 WIB',
    is_open BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create Branch Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id TEXT REFERENCES public.branches(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('TELLER', 'CUSTOMER_SERVICE')),
    name TEXT NOT NULL,
    description TEXT,
    avg_wait_minutes INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Queue Tickets Table
CREATE TABLE IF NOT EXISTS public.tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number TEXT NOT NULL,
    branch_id TEXT REFERENCES public.branches(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL CHECK (service_type IN ('TELLER', 'CUSTOMER_SERVICE')),
    service_name TEXT NOT NULL,
    customer_id TEXT NOT NULL DEFAULT 'guest-customer',
    customer_name TEXT NOT NULL DEFAULT 'Customer',
    status TEXT NOT NULL CHECK (status IN ('WAITING', 'CALLED', 'SERVING', 'SERVED', 'SKIPPED', 'CANCELLED')) DEFAULT 'WAITING',
    counter_name TEXT,
    now_serving_number TEXT,
    people_ahead INTEGER NOT NULL DEFAULT 0,
    estimated_wait_minutes INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    called_at TIMESTAMPTZ,
    served_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- 4. Create Staff Profiles Table
CREATE TABLE IF NOT EXISTS public.staff_profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'STAFF',
    employee_id TEXT NOT NULL,
    branch_id TEXT REFERENCES public.branches(id),
    assigned_service TEXT NOT NULL DEFAULT 'TELLER',
    assigned_counter TEXT NOT NULL DEFAULT 'Counter 01',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- Enable Realtime
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.branches;

-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;

-- Anonymous public read access for branch and service info
CREATE POLICY "Public read branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);

-- Customer & Staff public ticket access (Stateless Guest & Staff)
CREATE POLICY "Public select tickets" ON public.tickets FOR SELECT USING (true);
CREATE POLICY "Public insert tickets" ON public.tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update tickets" ON public.tickets FOR UPDATE USING (true);

-- Staff profile read
CREATE POLICY "Public read staff" ON public.staff_profiles FOR SELECT USING (true);

-- ==============================================================================
-- Initial Seed Data
-- ==============================================================================
INSERT INTO public.branches (id, name, short_name, city, address, operating_hours, is_open)
VALUES
    ('branch-depok', 'NEXA Bank — Depok Branch', 'Depok Branch', 'Depok', 'Jl. Margonda Raya No. 188, Depok', '08:00 - 15:00 WIB', true),
    ('branch-sudirman', 'NEXA Bank — Sudirman Branch', 'Sudirman Branch', 'Jakarta Pusat', 'Menara NEXA Lt. GF, Jl. Jend. Sudirman Kav. 52-53', '08:00 - 15:30 WIB', true),
    ('branch-bogor', 'NEXA Bank — Bogor Branch', 'Bogor Branch', 'Bogor', 'Jl. Pajajaran No. 45, Bogor Timur', '08:00 - 15:00 WIB', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.services (branch_id, type, name, description, avg_wait_minutes)
VALUES
    ('branch-depok', 'TELLER', 'Teller Services', 'Cash deposits, withdrawals, transfers, and bill settlements.', 5),
    ('branch-depok', 'CUSTOMER_SERVICE', 'Customer Service', 'Account opening, ATM cards, mobile banking, and consultations.', 15),
    ('branch-sudirman', 'TELLER', 'Teller Services', 'Cash deposits, withdrawals, transfers, and bill settlements.', 6),
    ('branch-sudirman', 'CUSTOMER_SERVICE', 'Customer Service', 'Account opening, ATM cards, mobile banking, and consultations.', 12),
    ('branch-bogor', 'TELLER', 'Teller Services', 'Cash deposits, withdrawals, transfers, and bill settlements.', 4),
    ('branch-bogor', 'CUSTOMER_SERVICE', 'Customer Service', 'Account opening, ATM cards, mobile banking, and consultations.', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.staff_profiles (id, full_name, email, role, employee_id, branch_id, assigned_service, assigned_counter)
VALUES
    ('staff-01', 'Rina Kusuma', 'rina.kusuma@nexabank.co.id', 'STAFF', 'NEXA-EMP-4091', 'branch-depok', 'TELLER', 'Counter 03')
ON CONFLICT (id) DO NOTHING;
