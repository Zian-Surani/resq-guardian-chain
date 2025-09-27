import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Phone, Clock, MapPin, User, Search, Filter } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  message: string;
  alert_type: string;
  status: string;
  created_at: string;
  latitude?: number;
  longitude?: number;
  profiles?: {
    full_name: string;
    phone: string;
  };
}

interface AlertManagementProps {
  alerts: Alert[];
  onUpdateStatus: (alertId: string, status: string) => void;
}

const AlertManagement: React.FC<AlertManagementProps> = ({ alerts, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesType = typeFilter === 'all' || alert.alert_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getAlertPriority = (type: string) => {
    switch (type) {
      case 'sos': return 'high';
      case 'danger': return 'high';
      case 'warning': return 'medium';
      default: return 'low';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'investigating': return 'secondary';
      case 'resolved': return 'default';
      default: return 'outline';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const alertTime = new Date(dateString);
    const diffMs = now.getTime() - alertTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return alertTime.toLocaleDateString();
  };

  const groupedAlerts = {
    active: filteredAlerts.filter(a => a.status === 'active'),
    investigating: filteredAlerts.filter(a => a.status === 'investigating'),
    resolved: filteredAlerts.filter(a => a.status === 'resolved')
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sos">SOS</SelectItem>
                  <SelectItem value="danger">Danger</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{groupedAlerts.active.length}</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{groupedAlerts.investigating.length}</p>
                <p className="text-sm text-muted-foreground">Under Investigation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{groupedAlerts.resolved.length}</p>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Active ({groupedAlerts.active.length})
            {groupedAlerts.active.length > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="investigating">
            Investigating ({groupedAlerts.investigating.length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({groupedAlerts.resolved.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({filteredAlerts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <AlertList 
            alerts={groupedAlerts.active} 
            onUpdateStatus={onUpdateStatus}
            showActions={true}
          />
        </TabsContent>
        
        <TabsContent value="investigating">
          <AlertList 
            alerts={groupedAlerts.investigating} 
            onUpdateStatus={onUpdateStatus}
            showActions={true}
          />
        </TabsContent>
        
        <TabsContent value="resolved">
          <AlertList 
            alerts={groupedAlerts.resolved} 
            onUpdateStatus={onUpdateStatus}
            showActions={false}
          />
        </TabsContent>
        
        <TabsContent value="all">
          <AlertList 
            alerts={filteredAlerts} 
            onUpdateStatus={onUpdateStatus}
            showActions={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AlertListProps {
  alerts: Alert[];
  onUpdateStatus: (alertId: string, status: string) => void;
  showActions: boolean;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, onUpdateStatus, showActions }) => {
  const getAlertPriority = (type: string) => {
    switch (type) {
      case 'sos': return 'high';
      case 'danger': return 'high';
      case 'warning': return 'medium';
      default: return 'low';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'investigating': return 'secondary';
      case 'resolved': return 'default';
      default: return 'outline';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const alertTime = new Date(dateString);
    const diffMs = now.getTime() - alertTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return alertTime.toLocaleDateString();
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No alerts to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const priority = getAlertPriority(alert.alert_type);
        
        return (
          <Card key={alert.id} className={`transition-all duration-200 ${
            priority === 'high' ? 'border-red-500 shadow-md' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant={getPriorityColor(priority)}>
                      {alert.alert_type.toUpperCase()}
                    </Badge>
                    <Badge variant={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {getTimeAgo(alert.created_at)}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{alert.title}</h3>
                    <p className="text-muted-foreground">{alert.message}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    {alert.profiles && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{alert.profiles.full_name}</span>
                        {alert.profiles.phone && (
                          <>
                            <Phone className="h-4 w-4 ml-2" />
                            <span>{alert.profiles.phone}</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    {alert.latitude && alert.longitude && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {showActions && alert.status !== 'resolved' && (
                  <div className="flex space-x-2 ml-4">
                    {alert.status === 'active' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateStatus(alert.id, 'investigating')}
                      >
                        Investigate
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => onUpdateStatus(alert.id, 'resolved')}
                    >
                      Resolve
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AlertManagement;