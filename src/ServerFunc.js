export const request = (apiFunctionName, payload) => {
  payload = payload || {};

  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((res) => {
        // Parse the response ONLY if it's a JSON string
        if (typeof res === "string") {
          try {
            const parsedRes = JSON.parse(res);
            // console.log("Parsed Response:", parsedRes); // Log the parsed object
            resolve(parsedRes);
          } catch (e) {
            console.error("Error parsing JSON:", e);
            resolve(res); // Resolve with original string on parsing error
          }
        } else {
          // console.log("Raw Response:", res); // Log the raw object
          resolve(res); // Resolve directly if it's already an object
        }
      })
      .withFailureHandler((err) => {
        console.error("Apps Script Error:", err); // Log the Apps Script error
        reject(err);
      })
      [apiFunctionName](payload);
  });
};

export const loadAppsScriptAPI = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.script) {
      resolve(); // API already loaded
      return;
    }
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      resolve(); // Call resolve when the script has loaded
    };
    script.onerror = (error) => {
      reject(error); // Reject the promise if there's an error loading
    };
    document.head.appendChild(script);
  });
};
