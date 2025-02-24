"use client";
import { Button, Drawer } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
function Homepage() {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const searchParams = useSearchParams();

  const formType =
    searchParams.get("formType") === "signup" ? "signup" : "signin";

  const menuItems = [
    { title: "Trang Chủ", link: "/" },
    { title: "Về Techx", link: "/about" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <div className="pt-5 px-10">
      <div className="flex justify-between items-center">
        <img src="/images.png" alt="Logo" className="w-40 h-34" />
        <div className="flex gap-5 items-center">
          <div className="flex gap-5">
            {menuItems.map((item) => (
              <span className="text-sm font-bold text-gray-500" key={item.title}>
                {item.title}
              </span>
            ))}
          </div>
          <Button type="primary" onClick={() => setShowDrawer(true)}>
            Login
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 min-h-[75vh] items-center">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-primary">THEY-WORK-EASY</h1>
          <q className="text-sm text-gray-500 mt-1 font-semibold">
            THEY-WORK-EASY là một công cụ quản lý công việc giúp bạn quản lý các
            dự án, nhiệm vụ và thành viên nhóm của mình tại một nơi. Hãy bắt đầu
            ngay hôm nay!
          </q>
        </div>
        <div className="flex justify-center">
          <img src="/img.png" alt="Logo" className="w-100 h-98" />
        </div>
      </div>
      {showDrawer && (
        <Drawer
          width={500}
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
        >
          {formType === "signin" ? (
            <SignIn routing="hash" signUpUrl="/?formType=signup" fallbackRedirectUrl={"/account/projects"}/>
          ) : (
            <SignUp routing="hash" signInUrl="/?formType=signin" fallbackRedirectUrl={"/account/projects"} />
          )}
        </Drawer>
      )}
    </div>
  );
}

export default Homepage;
