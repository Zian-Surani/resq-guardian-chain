import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import UserDashboard from '@/components/UserDashboard';
import AuthorityDashboard from '@/components/AuthorityDashboard';

const Dashboard = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Profile Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your profile.</p>
        </div>
      </div>
    );
  }

  return profile.role === 'authority' ? <AuthorityDashboard /> : <UserDashboard />;
};

export default Dashboard;