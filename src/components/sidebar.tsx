"use client";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Building,
  Clock,
  Code2,
  DollarSign,
  Home,
  KeyIcon,
  LucideIcon,
  QrCodeIcon,
  Repeat1,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "../../public/images/logo-transparent-png.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuthStore } from "@/context/auth-context";
import Admin, { AdminRole } from "@/models/admin";
import Merchant, { APIS } from "@/models/merchant";
import Image from "next/image";
interface SubMenuItem {
  name: string;
  link: string;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  link?: string;
  subItems?: SubMenuItem[];
}
const adminMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: Home,
    link: "/dashboard",
  },
  //Role Permission
  {
    name: "Role Permission",
    icon: KeyIcon,
    link: "/dashboard/permissions",
  },
  {
    name: "Merchants",
    icon: BriefcaseBusiness,
    link: "/dashboard/merchants",
  },
  {
    name: "Transactions",
    icon: Users,
    link: "/dashboard/admin-transactions",
  },
  {
    name: "User Payouts",
    icon: Users,
    link: "/dashboard/user-payouts",
  },
  //payouts
  {
    name: "Payouts",
    icon: DollarSign,
    link: "/dashboard/payouts",
  },

  {
    name: "Employee",
    icon: Users,
    link: "/dashboard/employee",
  },

  {
    name: "API Services",
    icon: Code2,
    link: "/dashboard/api-service",
  },
  {
    name: "API Requests",
    icon: Code2,
    link: "/dashboard/api-requests",
  },
  {
    name: "Login Logs",
    icon: Clock,
    link: "/dashboard/login-log",
  },
  {
    name: "Surcharge",
    icon: DollarSign,
    link: "/dashboard/surcharge",
  },
];

const Sidebar = ({ className }: PropsWithClassName) => {
  const merchantMenuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: Home,
      link: "/dashboard/support-dashboard",
    },
    {
      name: "Support",
      icon: Users,
      link: "/dashboard/support",
    },
    // {
    //   name: "Merchant Documents",
    //   icon: Building,
    //   link: "/dashboard/documents",
    // },
  ];

  const pathname = usePathname();
  const { userDetails } = useAuthStore();

  const renderMenuItem = (item: MenuItem) => {
    const isActive =
      pathname === item.link ||
      (item.subItems &&
        item.subItems.some((subItem) => pathname === subItem.link));

    if (item.subItems) {
      return (
        <AccordionItem value={item.name} key={item.name}>
          <AccordionTrigger
            className={cn(
              "hover:no-underline [&[data-state=open]]:text-white text-gray-400 flex items-center py-2 px-4 text-sm font-medium [&[data-state=open]]:bg-background [&[data-state=open]]:rounded-b-none rounded-md hover:bg-background ",
              isActive &&
                "bg-background text-primary-foreground hover:bg-background"
            )}
          >
            <span className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </span>
          </AccordionTrigger>
          <AccordionContent className="bg-background rounded-b-md pl-4">
            <div className="flex flex-col space-y-1 px-4">
              {item.subItems.map((subItem :any) => (
                <Link
                  key={subItem.name}
                  href={subItem.link}
                  className={cn(
                    "flex !text-primary items-center py-2 px-2 text-sm font-medium rounded-md hover:bg-background hover:text-accent-foreground",
                    "transition-colors duration-200",
                    pathname === subItem.link &&
                      "bg-primary/50 text-accent-foreground"
                  )}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    } else if (item.link) {
      return (
        <Link
          key={item.name}
          href={item.link}
          className={cn(
            "flex items-center text-gray-400 py-2 px-4 text-sm font-medium rounded-md hover:bg-gray-100/10",
            "transition-colors duration-200",
            isActive &&
              "bg-gray-300/30 text-primary-foreground  hover:text-primary-foreground"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Link>
      );
    }
    return null;
  };

  const menuItems =
    userDetails?.role === AdminRole.SUPER_ADMIN
      ? adminMenuItems
      : merchantMenuItems;

  const isMerchant = userDetails?.role != AdminRole.SUPER_ADMIN;

  if (isMerchant) {
    const merchant = userDetails as Merchant;

    // if (!merchant.restrictedApi?.includes(APIS.MERCHANT_QR)) {
    //   menuItems.push({
    //     name: "Add QR Codes and Bank Accounts",
    //     icon: QrCodeIcon,
    //     link: "/dashboard/qr-codes",
    //   });
    // }

    // if (!merchant.restrictedApi?.includes(APIS.USER_WITHDRAW)) {
    //   menuItems.push({
    //     name: "Withdraws",
    //     icon: DollarSign,
    //     subItems: [
    //       { name: "User Payouts", link: "/dashboard/user-payouts" },
    //     ],
    //   });
    // }

    // if (!merchant.restrictedApi?.includes(APIS.MERCHANT_PAYOUT)) {
    //   menuItems.push({
    //     name: "Payout Settings",
    //     icon: Repeat1,
    //     subItems: [
    //       { name: "Payouts", link: "/dashboard/payouts" },
    //       { name: "Payout Options", link: "/dashboard/payout-options" },
    //     ],
    //   });
    // }

    // if (!merchant.restrictedApi?.includes(APIS.DEVELOPER_API)) {

    //   menuItems.push({
    //     name: "API Settings",
    //     icon: KeyIcon,
    //     subItems: [
    //       { name: "Available API's", link: "/dashboard/apis" },
    //       { name: "Developer Settings", link: "/dashboard/api-key" },
    //     ],
    //   });
    // }
  }

  return (
    <div
      style={{
        backgroundImage: `url('/images/sidebarBG.jpg')`, // Replace with your image path
        backgroundSize: "cover", // Adjusts image to cover the nav
        backgroundPosition: "center", // Centers the image
        flex: 1,
        overflowY: "auto",
      }}
      className={cn("rounded-br-xl rounded-tr-xl flex  flex-col ", className)}
    >
      <div className="flex h-16 items-center  px-4">
        <Image className="w-28" alt="RapidPay24" src={LogoIcon} />
        {/* <Logo /> */}
      </div>
      <nav className="flex-1 overflow-y-auto px-4 pt-8">
        <Accordion type="multiple" className="w-full space-y-2">
          {menuItems.map(renderMenuItem)}
        </Accordion>
      </nav>
    </div>
  );
};

export default Sidebar;
