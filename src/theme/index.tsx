import { ConfigProvider } from "antd";
import React from "react";

function Theme({ children }: { children: React.ReactNode }) {
  const primaryColor = "#c53dbd";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          controlOutline: "none",
          borderRadius: 40
        },
        components:{
            Input:{
                controlHeight: 45,
            },
            Button:{
                controlHeight: 40,
                defaultBg:'#DDDDDD',
                defaultActiveBg:'#DDDDDD'
            },
            Select:{
                controlHeight: 40,
            },     
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default Theme;
