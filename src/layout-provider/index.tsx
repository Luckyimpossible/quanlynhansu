"use client";

import { IUser } from "@/interfaces";
import { saveCurrentUserToMongoDB } from "@/server-actions/users";
import { Alert, Button } from "antd";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import MenuItems from "./menu-items";
import Spinner from "@/components/ui/spinner";
import { IUsersStore, usersStore } from "@/store/users-store";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { loggedInUserData, setLoggedInUserData }: IUsersStore =
    usersStore() as any;
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showMenuItems, setShowMenuItems] = React.useState<boolean>(false);
  const pathname = usePathname();

  const getCurrentUserData = async () => {
    try {
      setLoading(true);
      const response = await saveCurrentUserToMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data as IUser);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname.includes("/account")) {
      getCurrentUserData();
    }
  }, []);

  if (!pathname.includes("/account")) {
    return <div>{children}</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
<div>
      <div className="p-5 bg-primary flex justify-between items-center">
        <img className=" w-30 h-12" src="/images2.png" />
        <div className="flex gap-5 items-center">
          <span className="text-sm font-semibold text-white uppercase">
            {loggedInUserData?.name}
          </span>
          <Button
            size="large"
            icon={<Menu size={20} />}
            onClick={() => setShowMenuItems(true)}
          ></Button>
        </div>
      </div>
      <div className="p-5">{children}</div>

      {showMenuItems && (
        <MenuItems
          showMenuItem={showMenuItems}
          setShowMenuItems={setShowMenuItems}
        />
      )}
    </div>
  );
}

export default LayoutProvider;