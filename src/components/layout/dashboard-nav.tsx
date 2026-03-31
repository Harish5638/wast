import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  LayoutDashboard,
  Package,
  FileCheck,
  Truck,
  Medal,
  Users,
} from "lucide-react";
import { Icons } from "@/components/icons";

// lucide-react doesn't have a direct equivalent for Package.
// This is a simple placeholder.
const PackageIcon = Package;

const commonLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/community", label: "Community", icon: Users },
];

const allRoleLinks = [
    { href: "/dashboard/my-donations", label: "My Donations", icon: PackageIcon },
    { href: "/dashboard/my-claims", label: "My Claims", icon: FileCheck },
    { href: "/dashboard/my-pickups", label: "My Pickups", icon: Truck },
];

const bottomLinks = [
    { href: "/dashboard/rewards", label: "Rewards", icon: Medal },
];

export function DashboardNav() {
  const pathname = usePathname();
  const allLinks = [...commonLinks, ...allRoleLinks, ...bottomLinks];

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
       <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">Food Waste System</span>
        </Link>
      {allLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
            pathname === href
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
