import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, Session } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Title } from "@radix-ui/react-toast";
import { AccountCardSkeleton } from "@/pages/Accounts/AccountCardSkeleton";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session as unknown as Session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col mx-4">
        <Title title="Loading..."/>
        <AccountCardSkeleton/>
        <AccountCardSkeleton/>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>; 
};

export default ProtectedRoute;
