import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

interface valueType {
  session: Session | null;
  user: User | null;
}
const AuthContext = createContext<valueType>({
  session: null,
  user: null,
});

function AuthProvider({ children }: { children: JSX.Element }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) return setError(error.message);
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
  };
  return (
    <AuthContext.Provider value={value}>
      {!error && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
