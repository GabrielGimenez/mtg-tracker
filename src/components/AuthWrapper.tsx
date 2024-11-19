"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, login } = useAuth();
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.authenticated) {
        login();
      } else {
        alert("Incorrect password");
      }
    } else {
      alert("Error during authentication");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Please enter the password</h1>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="border p-2 mb-4"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
