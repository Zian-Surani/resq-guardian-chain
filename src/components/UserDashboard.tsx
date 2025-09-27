import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Shield, AlertTriangle, Phone, Navigation, Users } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import SOSButton from './SOSButton';

interface Alert {
  id: string;
  title: string;
  message: string;
  alert_type: string;
  status: string;
  created_at: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  safety_score: number;
}

const UserDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
  const [safetyScore, setSafetyScore] = useState(75);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
    getCurrentLocation();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            safety_score: 75 + Math.floor(Math.random() * 20) // Random safety score
          };
          setCurrentLocation(location);
          setSafetyScore(location.safety_score);
          
          // Store location in database
          supabase
            .from('user_locations')
            .insert([{
              user_id: profile?.user_id,
              latitude: location.latitude,
              longitude: location.longitude,
              safety_score: location.safety_score
            }])
            .then(() => console.log('Location saved'));
        },
        (error) => {
          console.error('Error getting location:', error);
          // Use default location (Ooty) for demo
          setCurrentLocation({
            latitude: 11.4064,
            longitude: 76.6932,
            safety_score: 82
          });
          setSafetyScore(82);
        }
      );
    }
  };

  const sendAlert = async (message: string, type: string = 'warning') => {
    try {
      const { error } = await supabase
        .from('alerts')
        .insert([{
          user_id: profile?.user_id,
          title: `${type.toUpperCase()} Alert`,
          message,
          alert_type: type,
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude
        }]);

      if (error) throw error;

      toast({
        title: "Alert Sent",
        description: "Your alert has been sent to authorities."
      });

      fetchAlerts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return 'destructive';
      case 'warning': return 'secondary';
      case 'sos': return 'destructive';
      default: return 'default';
    }
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
              <h1 className="text-2xl font-bold text-foreground">ResQ Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {profile?.full_name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={safetyScore > 80 ? 'default' : safetyScore > 60 ? 'secondary' : 'destructive'}>
              Safety Score: {safetyScore}
            </Badge>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SOSButton onSOS={(message) => sendAlert(message, 'sos')} />
          
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => sendAlert('Need immediate help with medical emergency', 'danger')}
          >
            <Phone className="h-6 w-6" />
            <span>Medical Alert</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => sendAlert('Suspicious activity reported in area', 'warning')}
          >
            <AlertTriangle className="h-6 w-6" />
            <span>Report Incident</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => sendAlert('Requesting assistance for navigation', 'info')}
          >
            <Navigation className="h-6 w-6" />
            <span>Need Assistance</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Live Location & Incidents</span>
              </CardTitle>
              <CardDescription>
                Real-time safety monitoring and incident alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <InteractiveMap 
                  userLocation={currentLocation} 
                  showIncidents={true}
                  showHeatmap={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Recent Alerts</span>
              </CardTitle>
              <CardDescription>
                Your recent alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No alerts yet</p>
              ) : (
                alerts.map((alert) => (
                  <Alert key={alert.id}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-muted-foreground">{alert.message}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(alert.created_at).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant={getAlertColor(alert.alert_type)}>
                        {alert.status}
                      </Badge>
                    </AlertDescription>
                  </Alert>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips for Your Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Stay Connected</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your phone charged and share your location with trusted contacts.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Know Emergency Numbers</h4>
                <p className="text-sm text-muted-foreground">
                  Local emergency: 108 | Police: 100 | Fire: 101
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Stay Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Be aware of your surroundings and trust your instincts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;