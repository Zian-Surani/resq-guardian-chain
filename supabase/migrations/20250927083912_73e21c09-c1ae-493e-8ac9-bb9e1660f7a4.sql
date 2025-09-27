-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('user', 'authority');

-- Create incident types enum
CREATE TYPE public.incident_type AS ENUM ('stampede', 'flood', 'fire', 'earthquake', 'landslide', 'accident', 'medical_emergency');

-- Create alert status enum
CREATE TYPE public.alert_status AS ENUM ('active', 'resolved', 'investigating');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authorities can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'authority'
    )
  );

-- Create locations table
CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  description TEXT,
  safety_score INTEGER DEFAULT 75,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the 3 demo locations
INSERT INTO public.locations (name, latitude, longitude, description, safety_score) VALUES
  ('Ooty', 11.4064, 76.6932, 'Hill station in Tamil Nadu known for tea gardens and cool climate', 82),
  ('Manali', 32.2396, 77.1887, 'Popular hill station in Himachal Pradesh', 78),
  ('Tiruchirappalli', 10.7905, 78.7047, 'Historic city in Tamil Nadu with temples and heritage sites', 85);

-- Create incidents table
CREATE TABLE public.incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID NOT NULL REFERENCES public.locations(id),
  incident_type incident_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  severity INTEGER DEFAULT 5, -- 1-10 scale
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

-- Create policies for incidents (readable by all authenticated users)
CREATE POLICY "Authenticated users can view incidents" ON public.incidents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authorities can manage incidents" ON public.incidents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'authority'
    )
  );

-- Insert demo incidents for each location
INSERT INTO public.incidents (location_id, incident_type, title, description, latitude, longitude, severity) VALUES
  ((SELECT id FROM public.locations WHERE name = 'Ooty'), 'landslide', 'Landslide Warning', 'Heavy rains causing landslide risk on Coonoor road', 11.4044, 76.6912, 7),
  ((SELECT id FROM public.locations WHERE name = 'Ooty'), 'fire', 'Forest Fire Alert', 'Small fire detected in Doddabetta area', 11.4104, 76.6952, 5),
  ((SELECT id FROM public.locations WHERE name = 'Manali'), 'flood', 'Flash Flood Warning', 'River levels rising due to heavy rainfall', 32.2376, 77.1867, 8),
  ((SELECT id FROM public.locations WHERE name = 'Manali'), 'stampede', 'Crowd Control Alert', 'Large gathering at Hadimba Temple', 32.2396, 77.1887, 6),
  ((SELECT id FROM public.locations WHERE name = 'Tiruchirappalli'), 'medical_emergency', 'Hospital Overcrowding', 'Emergency services stretched thin', 10.7885, 78.7027, 4),
  ((SELECT id FROM public.locations WHERE name = 'Tiruchirappalli'), 'accident', 'Traffic Accident', 'Multi-vehicle collision on NH83', 10.7925, 78.7067, 6);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  incident_id UUID REFERENCES public.incidents(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  alert_type TEXT DEFAULT 'info', -- info, warning, danger, sos
  status alert_status DEFAULT 'active',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for alerts
CREATE POLICY "Users can view their own alerts" ON public.alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alerts" ON public.alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" ON public.alerts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authorities can view all alerts" ON public.alerts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'authority'
    )
  );

CREATE POLICY "Authorities can update all alerts" ON public.alerts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'authority'
    )
  );

-- Create user_locations table for tracking
CREATE TABLE public.user_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  safety_score INTEGER DEFAULT 75,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_locations ENABLE ROW LEVEL SECURITY;

-- Create policies for user_locations
CREATE POLICY "Users can manage their own locations" ON public.user_locations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Authorities can view all user locations" ON public.user_locations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'authority'
    )
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();