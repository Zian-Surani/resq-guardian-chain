import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  MapPin, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import AlertManagement from './AlertManagement';

interface Alert {
  id: string;
  title: string;
  message: string;
  alert_type: string;
  status: 'active' | 'investigating' | 'resolved';
  created_at: string;
  latitude?: number;
  longitude?: number;
  profiles?: {
    full_name: string;
    phone: string;
  } | null;
}

interface Incident {
  id: string;
  title: string;
  incident_type: string;
  severity: number;
  is_active: boolean;
  created_at: string;
  latitude: number;
  longitude: number;
  locations: {
    name: string;
  };
}

interface Stats {
  totalAlerts: number;
  activeIncidents: number;
  resolvedToday: number;
  averageResponseTime: string;
}

const AuthorityDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalAlerts: 0,
    activeIncidents: 0,
    resolvedToday: 0,
    averageResponseTime: '12 min'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time subscriptions
    const alertsSubscription = supabase
      .channel('alerts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, 
        () => fetchAlerts())
      .subscribe();

    const incidentsSubscription = supabase
      .channel('incidents-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, 
        () => fetchIncidents())
      .subscribe();

    return () => {
      alertsSubscription.unsubscribe();
      incidentsSubscription.unsubscribe();
    };
  }, []);

  const fetchDashboardData = async () => {
    await Promise.all([
      fetchAlerts(),
      fetchIncidents(),
      fetchStats()
    ]);
    setLoading(false);
  };

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchIncidents = async () => {
    try {
      const { data, error } = await supabase
        .from('incidents')
        .select(`
          *,
          locations (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIncidents(data || []);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: alertsData } = await supabase
        .from('alerts')
        .select('id, status, created_at');

      const { data: incidentsData } = await supabase
        .from('incidents')
        .select('id, is_active');

      const totalAlerts = alertsData?.length || 0;
      const activeIncidents = incidentsData?.filter(i => i.is_active).length || 0;
      
      // Calculate resolved today
      const today = new Date().toISOString().split('T')[0];
      const resolvedToday = alertsData?.filter(a => 
        a.status === 'resolved' && 
        a.created_at.startsWith(today)
      ).length || 0;

      setStats({
        totalAlerts,
        activeIncidents,
        resolvedToday,
        averageResponseTime: '12 min'
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateAlertStatus = async (alertId: string, status: 'active' | 'investigating' | 'resolved') => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ status })
        .eq('id', alertId);

      if (error) throw error;

      toast({
        title: "Alert Updated",
        description: `Alert status changed to ${status}`
      });

      fetchAlerts();
      fetchStats();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const createIncident = async (title: string, type: 'accident' | 'earthquake' | 'fire' | 'flood' | 'landslide' | 'medical_emergency' | 'stampede', location: { lat: number, lng: number }) => {
    try {
      const { error } = await supabase
        .from('incidents')
        .insert([{
          title,
          incident_type: type,
          latitude: location.lat,
          longitude: location.lng,
          location_id: (await supabase.from('locations').select('id').limit(1).single()).data?.id,
          severity: 5
        }]);

      if (error) throw error;

      toast({
        title: "Incident Created",
        description: "New incident has been registered"
      });

      fetchIncidents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="destructive">Active</Badge>;
      case 'investigating': return <Badge variant="secondary">Investigating</Badge>;
      case 'resolved': return <Badge variant="default">Resolved</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'text-red-600';
    if (severity >= 6) return 'text-orange-600';
    if (severity >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Authority Control Center</h1>
              <p className="text-sm text-muted-foreground">Welcome, {profile?.full_name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalAlerts}</p>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.activeIncidents}</p>
                  <p className="text-sm text-muted-foreground">Active Incidents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.resolvedToday}</p>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.averageResponseTime}</p>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alert Management</TabsTrigger>
            <TabsTrigger value="incidents">Incident Tracking</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Latest alerts from users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {alerts.slice(0, 10).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-muted-foreground">{alert.message}</div>
                        <div className="text-xs text-muted-foreground">
                          {alert.profiles?.full_name} • {new Date(alert.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(alert.status)}
                        {alert.status === 'active' && (
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAlertStatus(alert.id, 'investigating')}
                            >
                              Investigate
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateAlertStatus(alert.id, 'resolved')}
                            >
                              Resolve
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Incidents</CardTitle>
                  <CardDescription>Current incidents requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {incidents.filter(i => i.is_active).map((incident) => (
                    <div key={incident.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{incident.title}</div>
                        <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                          Severity: {incident.severity}/10
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {incident.incident_type} • {incident.locations?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(incident.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <AlertManagement 
              alerts={alerts} 
              onUpdateStatus={updateAlertStatus}
            />
          </TabsContent>

          <TabsContent value="incidents">
            <Card>
              <CardHeader>
                <CardTitle>Incident Management</CardTitle>
                <CardDescription>Track and manage all incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{incident.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Type: {incident.incident_type} • Location: {incident.locations?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(incident.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                          Severity: {incident.severity}
                        </Badge>
                        <Badge variant={incident.is_active ? 'destructive' : 'default'}>
                          {incident.is_active ? 'Active' : 'Resolved'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Live Monitoring Map</CardTitle>
                <CardDescription>Real-time view of all incidents and user locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <InteractiveMap 
                    showIncidents={true}
                    showHeatmap={true}
                    showUserLocations={true}
                    onCreateIncident={createIncident}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthorityDashboard;