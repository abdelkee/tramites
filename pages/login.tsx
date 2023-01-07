import ctl from "@netlify/classnames-template-literals";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../utils/supabaseClient";

export default function LoginPage() {
  // ---- HOOKS
  const router = useRouter();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wait, setWait] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 1000);
  }, []);

  if (session) router.replace("/");
  if (wait) return <p className="w-full text-center mt-28">loading...</p>;

  // ---- FUNCTIONS
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
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

  // ---- STYLES
  const s = {
    formContainer: ctl(`
      flex 
      flex-col 
      p-4 
      space-y-12 
      text-slate-900
    `),
    inputsContainer: ctl(`
      flex 
      flex-col 
      space-y-4
    `),
    submitButton: ctl(`
      p-4 
      text-lg 
      font-semibold 
      tracking-wider 
      rounded 
      bg-slate-600 
      text-slate-50
    `),
  };

  // ---- JSX
  return (
    <main className="p-8 mt-28">
      <form className={s.formContainer} onSubmit={login}>
        <div className={s.inputsContainer}>
          <input
            type="email"
            className="input-field"
            placeholder="Email.."
            required
            onChange={handleEmailChange}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password.."
            required
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className={s.submitButton}>
          Login
        </button>
      </form>
    </main>
  );
}
