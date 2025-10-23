import AdminRoute from "@/components/auth/admin";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <AdminRoute>{children}</AdminRoute>;
};

export default layout;
