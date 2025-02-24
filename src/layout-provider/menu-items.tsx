"use client";

import { useAuth } from "@clerk/nextjs";
import { Button, Drawer, message } from "antd";
import { HelpCircle, LayoutDashboard, List, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { on } from "node:stream";
import React from "react";

interface MenuItemsProps {
  showMenuItem: boolean;
  setShowMenuItems: (showMenuItems: boolean) => void;
}

function MenuItems({ showMenuItem, setShowMenuItems }: MenuItemsProps) {
  const iconsize = 14;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState<boolean>(false);
  const {signOut} = useAuth();
  const onSignOut = async() => {
    try {
      setLoading(true);
      await signOut();
      message.success("Signed out successfully");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const menuItems = [
    {
      label: "Projects",
      icon: <LayoutDashboard size={iconsize} />,
      path: "/account/projects",
    },
    {
      label: "Profile",
      icon: <User size={iconsize} />,
      path: "/account/profile",
    },
    {
      label: "All Tasks",
      icon: <List size={iconsize} />,
      path: "/account/tasks",
    },
    {
      label: "Help & Support",
      icon: <HelpCircle size={iconsize} />,
      path: "/account/help",
    },
  ];

  return (
    <Drawer open={showMenuItem} onClose={() => setShowMenuItems(false)}>
      <div className="flex gap-10 flex-col mt-10">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`flex gap-5 items-center cursor-pointer ${
              pathname === item.path
                ? "border-gray-500 p-2 border bg-gray-200 rounded-sm"
                : "p-2"
            }`}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
        <Button icon={<LogOut size={iconsize} />} loading={loading}  onClick={onSignOut}>
          Đăng Xuất
        </Button>
      </div>
    </Drawer>
  );
}

export default MenuItems;
