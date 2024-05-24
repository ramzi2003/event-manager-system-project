// src/utils/fetchData.js
async function fetchData(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    console.log("Access token expired, attempting to refresh");

    let refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("Refresh token is missing. Redirecting to login.");
      redirectToLogin();
      return null;
    }

    console.log(refreshToken);

    const refreshResponse = await fetch("http://10.121.4.111:8080/api/auth/refresh-token", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }), // Use the correct field name as per the API documentation
    });

    console.log(refreshResponse);

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      localStorage.setItem("accessToken", data.access); // Make sure to use the correct property names from the response

      // Only update the refresh token if a new one is provided in the response
      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }

      // Retry the original request with the new access token
      options.headers.Authorization = `Bearer ${data.access}`;
      response = await fetch(url, options);
      return response;
    } else {
      console.error("Failed to refresh token", await refreshResponse.text());
      redirectToLogin();
      return null;
    }
  } else if (!response.ok) {
    console.error("Request failed with status:", response.status, await response.text());
  }

  return response;
}

function redirectToLogin() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login"; // Adjust this if needed
}

export default fetchData;
