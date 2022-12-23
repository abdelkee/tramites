import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../utils/supabaseClient";

function LoginPage() {
  const router = useRouter();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wait, setWait] = useState(true);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill the required fields!");
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) return alert("Error while signing!");
    router.replace("/");
  };

  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 1000);
  }, []);

  if (session) router.replace("/");
  if (wait) return <p className="w-full text-center mt-28">loading...</p>;
  return (
    <main className="p-8 mt-28">
      <form
        className="flex flex-col p-4 space-y-12 text-slate-900"
        onSubmit={login}
      >
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            className="input-field"
            placeholder="Email.."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password.."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-4 text-lg font-semibold tracking-wider rounded bg-slate-600 text-slate-50"
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
