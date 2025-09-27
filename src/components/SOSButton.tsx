import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Phone, AlertTriangle } from 'lucide-react';

interface SOSButtonProps {
  onSOS: (message: string) => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onSOS }) => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();

  const startSOS = () => {
    setIsConfirmOpen(true);
  };

  const confirmSOS = () => {
    setIsConfirmOpen(false);
    setIsSOSActive(true);
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          executeSOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    setCountdown(0);
    setIsConfirmOpen(false);
    toast({
      title: "SOS Cancelled",
      description: "Emergency alert has been cancelled."
    });
  };

  const executeSOS = () => {
    setIsSOSActive(false);
    const sosMessage = `EMERGENCY SOS: Immediate assistance required at current location. Auto-generated emergency alert.`;
    onSOS(sosMessage);
    
    toast({
      title: "SOS Alert Sent!",
      description: "Emergency services have been notified. Help is on the way.",
      variant: "destructive"
    });

    // Simulate emergency call
    setTimeout(() => {
      toast({
        title: "Emergency Response",
        description: "Local authorities contacted. Estimated arrival: 8 minutes.",
      });
    }, 2000);
  };

  return (
    <>
      <Button
        variant={isSOSActive ? "destructive" : "outline"}
        className={`h-24 flex flex-col items-center justify-center space-y-2 ${
          isSOSActive ? 'animate-pulse bg-red-600 hover:bg-red-700' : 'border-red-500 text-red-600 hover:bg-red-50'
        }`}
        onClick={isSOSActive ? cancelSOS : startSOS}
        disabled={countdown > 0}
      >
        <Phone className="h-6 w-6" />
        <span className="font-bold">
          {isSOSActive ? (countdown > 0 ? `SOS in ${countdown}s` : 'Sending SOS...') : 'SOS Emergency'}
        </span>
        {isSOSActive && countdown > 0 && (
          <span className="text-xs">Tap to cancel</span>
        )}
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency SOS</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to send an emergency SOS alert? This will notify local authorities and emergency services.
            </DialogDescription>
          </DialogHeader>
          
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>This is for genuine emergencies only.</strong><br />
              • Local police will be notified<br />
              • Your location will be shared<br />
              • Emergency services may be dispatched
            </AlertDescription>
          </Alert>

          <div className="flex space-x-3">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={confirmSOS}
            >
              Send SOS Alert
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;