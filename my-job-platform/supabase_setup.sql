-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  contact TEXT,
  work_type TEXT,
  mode TEXT,
  city TEXT,
  salary_min_k NUMERIC,
  salary_max_k NUMERIC,
  negotiable BOOLEAN DEFAULT FALSE,
  required_skills JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create resumes table (one profile per user)
CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
  name TEXT,
  contact TEXT,
  skills JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Policies for jobs
-- 1. Everyone can view jobs
CREATE POLICY "Jobs are viewable by everyone" 
ON jobs FOR SELECT 
USING (true);

-- 2. Users can insert their own jobs
CREATE POLICY "Users can insert their own jobs" 
ON jobs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. Users can update their own jobs
CREATE POLICY "Users can update their own jobs" 
ON jobs FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. Users can delete their own jobs
CREATE POLICY "Users can delete their own jobs" 
ON jobs FOR DELETE 
USING (auth.uid() = user_id);

-- Policies for resumes
-- 1. Everyone can view resumes
CREATE POLICY "Resumes are viewable by everyone" 
ON resumes FOR SELECT 
USING (true);

-- 2. Users can insert their own resume
CREATE POLICY "Users can insert their own resume" 
ON resumes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. Users can update their own resume
CREATE POLICY "Users can update their own resume" 
ON resumes FOR UPDATE 
USING (auth.uid() = user_id);

-- Add nickname column to resumes table
ALTER TABLE resumes ADD COLUMN IF NOT EXISTS nickname TEXT;
