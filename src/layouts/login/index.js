  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";


  function LoginLayout() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accessToken, setAccessToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      if (accessToken) {
        navigate('/dashboard');  // Use navigate directly
      }
    }, [accessToken, navigate]);

    const signIn = async (event) => {
      event.preventDefault();  // Prevent form default submission
      if (!username || !password) {
        setError('Please fill in both username and password.');
        return;
      }
    
      const credentials = {
        username,
        password
      };
    
      try {
        const tokenResponse = await fetch('http://www.localhost:8000/auth/jwt/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
    
        if (!tokenResponse.ok) {
          throw new Error('Failed to sign in');
        }
        
    
        const responseData = await tokenResponse.json();
        
        console.log(responseData.access);
    
        if (!responseData || !responseData.access) {
          throw new Error('Access token not found in response');
        }
    
        const { access, refresh } = responseData;
    
        // Store tokens in localStorage
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    
        setAccessToken(access);
        setError('');
      } catch (error) {
        console.error('Sign In Error:', error);
        if (error.message === 'Failed to sign in') {
          setError('Wrong username or password. Please try again.');
        } else {
          setError('Error signing in. Please try again.');
        }
        setAccessToken(null);
      }
    };

    return (
      <div className="flex min-h-full flex-col justify-center md:items-center px-6 py-12 lg:px-8 md:bg-slate-50">
        <div className="md:container bg-white md:p-20 md:w-auto rounded-3xl md:shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={signIn}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
              {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default LoginLayout;
