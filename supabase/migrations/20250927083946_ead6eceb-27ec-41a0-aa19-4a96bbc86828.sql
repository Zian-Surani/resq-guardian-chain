-- Enable RLS on locations table (it was missing)
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Create policy for locations (readable by all authenticated users)
CREATE POLICY "Authenticated users can view locations" ON public.locations
  FOR SELECT TO authenticated USING (true);