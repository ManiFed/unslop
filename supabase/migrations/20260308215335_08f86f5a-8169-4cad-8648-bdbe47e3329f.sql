CREATE TABLE public.slop_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id TEXT NOT NULL,
  accused_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  incident_date DATE NOT NULL,
  severity INTEGER NOT NULL CHECK (severity BETWEEN 1 AND 5),
  slop_phrase TEXT NOT NULL,
  evidence TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.slop_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit reports" ON public.slop_reports FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can read reports" ON public.slop_reports FOR SELECT TO anon, authenticated USING (true);