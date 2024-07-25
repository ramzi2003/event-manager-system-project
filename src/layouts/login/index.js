import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

function LoginLayout() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!username || !password) {
      setError("Please fill in both username and password.");
      return;
    }

    const credentials = {
      username,
      password,
    };

    try {
      const tokenResponse = await fetch(
        "http://10.121.4.116:8000/auth/jwt/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!tokenResponse.ok) {
        throw new Error("Failed to sign in");
      }

      const responseData = await tokenResponse.json();

      if (!responseData || !responseData.access) {
        throw new Error("Access token not found in response");
      }

      const { access, refresh } = responseData;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      setError("");

      // Navigate to the dashboard after successfully setting the access token
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      console.error("Sign In Error:", error);
      if (error.message === "Failed to sign in") {
        setError("Wrong username or password. Please try again.");
      } else {
        setError("Error signing in. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          {error && (
            <div className="mt-4 text-center text-red-500">{error}</div>
          )}

          <form className="space-y-6 mt-4" onSubmit={signIn}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                {loading ? (
                  <ReactLoading
                    type="spin"
                    color="#FFFFFF"
                    width={23}
                    height={20}
                  />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
