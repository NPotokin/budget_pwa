import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, Session } from "react-router-dom";
import { supabase } from "../../supabaseClient";

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
    return <div>Загрузка...</div>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>; // Render children if session exists
};

export default ProtectedRoute;
