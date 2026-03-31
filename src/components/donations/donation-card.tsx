
import Image from 'next/image';
import { Donation, Role } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, MapPin, Tag, HandHeart, Truck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/use-current-user';

type DonationCardProps = {
  donation: Donation;
  onClaim: (donation: Donation) => void;
  onSchedulePickup: (donation: Donation) => void;
};

const categoryColors: Record<Donation['category'], string> = {
  Edible: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300',
  Usable: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300',
  Compost: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/50 dark:text-amber-300',
};

export function DonationCard({ donation, onClaim, onSchedulePickup }: DonationCardProps) {
  const currentUser = useCurrentUser();

  const renderAction = () => {
    // For prototyping, show actions regardless of role.
    if (donation.status === 'available') {
        return (
            <Button size="sm" onClick={() => onClaim(donation)} className="w-full sm:w-auto">
                <HandHeart className="mr-2 h-4 w-4" />
                Claim
            </Button>
        );
    }
    
    if (donation.status === 'claimed' && !donation.pickedUpBy) {
        return (
            <Button size="sm" variant="accent" onClick={() => onSchedulePickup(donation)} className="w-full sm:w-auto">
                <Truck className="mr-2 h-4 w-4" />
                Pickup
            </Button>
        );
    }

    return (
        <Badge variant={donation.status === 'completed' ? 'default' : 'secondary'} className={donation.status === 'completed' ? 'bg-primary/80' : ''}>
          {donation.pickedUpBy && donation.status === 'claimed' ? 'Pickup Scheduled' : donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
        </Badge>
    );
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={donation.imageUrl}
            alt={donation.foodType}
            data-ai-hint={donation.imageHint}
            fill
            className="object-cover"
          />
          <Badge className={cn('absolute top-2 right-2', categoryColors[donation.category])}>
            {donation.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="font-headline text-lg mb-2 leading-tight">{donation.imageHint || donation.foodType}</CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span>{donation.quantity}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{donation.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{donation.pickupTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex-col sm:flex-row gap-2 sm:justify-between items-center border-t">
        <div className="flex items-center gap-2 self-start sm:self-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={donation.donor.avatarUrl} alt={donation.donor.name} />
            <AvatarFallback>{donation.donor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-medium">{donation.donor.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(donation.createdAt, { addSuffix: true }).replace('about ','')}
            </p>
          </div>
        </div>
        {renderAction()}
      </CardFooter>
    </Card>
  );
}
