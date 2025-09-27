import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, AlertTriangle, Flame, Waves, Mountain, Car, Heart, Users } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  safety_score: number;
}

interface Incident {
  id: string;
  title: string;
  incident_type: string;
  latitude: number;
  longitude: number;
  severity: number;
  is_active: boolean;
  locations: {
    name: string;
  };
}

interface UserLocation {
  latitude: number;
  longitude: number;
  safety_score: number;
}

interface InteractiveMapProps {
  userLocation?: UserLocation | null;
  showIncidents?: boolean;
  showHeatmap?: boolean;
  showUserLocations?: boolean;
  onCreateIncident?: (title: string, type: string, location: { lat: number, lng: number }) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  userLocation,
  showIncidents = true,
  showHeatmap = false,
  showUserLocations = false,
  onCreateIncident
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [locationsResult, incidentsResult] = await Promise.all([
        supabase.from('locations').select('*'),
        supabase.from('incidents').select(`
          *,
          locations (
            name
          )
        `).eq('is_active', true)
      ]);

      if (locationsResult.data) setLocations(locationsResult.data);
      if (incidentsResult.data) setIncidents(incidentsResult.data);
    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'fire': return <Flame className="h-4 w-4 text-red-600" />;
      case 'flood': return <Waves className="h-4 w-4 text-blue-600" />;
      case 'landslide': return <Mountain className="h-4 w-4 text-amber-600" />;
      case 'accident': return <Car className="h-4 w-4 text-orange-600" />;
      case 'medical_emergency': return <Heart className="h-4 w-4 text-red-600" />;
      case 'stampede': return <Users className="h-4 w-4 text-purple-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getSafetyColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'border-red-600 bg-red-100';
    if (severity >= 6) return 'border-orange-600 bg-orange-100';
    if (severity >= 4) return 'border-yellow-600 bg-yellow-100';
    return 'border-green-600 bg-green-100';
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-green-200 to-blue-300"></div>
      </div>

      {/* Locations */}
      <div className="relative z-10 p-4 h-full overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedLocation?.id === location.id ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <Card className="h-full min-h-[200px]">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                    </div>
                    <Badge className={`${getSafetyColor(location.safety_score)} text-white`}>
                      {location.safety_score}
                    </Badge>
                  </div>
                  
                  {/* Heatmap visualization */}
                  {showHeatmap && (
                    <div className="mb-3">
                      <div className="text-xs text-muted-foreground mb-1">Safety Heatmap</div>
                      <div className="h-8 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full relative">
                        <div 
                          className="absolute top-0 w-3 h-8 bg-white border-2 border-gray-600 rounded-full transform -translate-x-1/2"
                          style={{ left: `${location.safety_score}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* User location indicator */}
                  {userLocation && Math.abs(userLocation.latitude - location.latitude) < 1 && (
                    <div className="mb-3 p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-700 dark:text-blue-300">You are here</span>
                      </div>
                    </div>
                  )}

                  {/* Active Incidents */}
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-2">Active Incidents</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {incidents
                        .filter(incident => Math.abs(incident.latitude - location.latitude) < 1)
                        .map((incident) => (
                          <div
                            key={incident.id}
                            className={`p-2 rounded-lg border-l-4 ${getSeverityColor(incident.severity)}`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              {getIncidentIcon(incident.incident_type)}
                              <span className="text-xs font-medium">{incident.title}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Severity: {incident.severity}/10
                            </div>
                          </div>
                        ))}
                      
                      {incidents.filter(incident => Math.abs(incident.latitude - location.latitude) < 1).length === 0 && (
                        <div className="text-xs text-muted-foreground italic">No active incidents</div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions for Authorities */}
                  {onCreateIncident && (
                    <div className="mt-3 pt-3 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCreateIncident(
                            `New incident in ${location.name}`,
                            'fire',
                            { lat: location.latitude, lng: location.longitude }
                          );
                        }}
                      >
                        Report Incident
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
          <div className="text-xs font-medium mb-2">Legend</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Safe (80+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Moderate (60-79)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Risk (&lt;60)</span>
            </div>
          </div>
        </div>

        {/* Location Details Modal */}
        {selectedLocation && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
            <Card className="max-w-md w-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{selectedLocation.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLocation(null)}
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Safety Score</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getSafetyColor(selectedLocation.safety_score)}`}
                          style={{ width: `${selectedLocation.safety_score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedLocation.safety_score}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Coordinates</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Recent Activity</div>
                    <div className="space-y-1">
                      {incidents
                        .filter(incident => Math.abs(incident.latitude - selectedLocation.latitude) < 1)
                        .slice(0, 3)
                        .map((incident) => (
                          <div key={incident.id} className="text-sm text-muted-foreground">
                            • {incident.title}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;