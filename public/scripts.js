// Dummy data for demonstration purposes
const deployedAPIs = [
    { name: "Chatgpt API", endpoint: "/api/ai?content=", method: "GET" }, { name: "GPT 4", endpoint: "/api/v2/ai?ask=", method: "GET" }, { name: "GPT X PINTEREST", endpoint: "/api/aipin?content=", method: "GET" }, { name: "Capcut Downloader", endpoint: "/api/capcut?url=", method: "GET" }, { name: "Chatgpt V2", endpoint: "/api/chatgpt?input=", method: "GET" }, { name: "Codellama", endpoint: "/api/cl?ques=", method: "GET" }, { name: "Random Edit Video API", endpoint: "/api/edit", method: "GET" }, { name: "Auto React API", endpoint: "/api/text?content=", method: "GET" }, { name: "Facebook Downloader API", endpoint: "/api/fbdl?url=", method: "GET" }, { name: "Geometry Dash Video API", endpoint: "/api/gd", method: "GET" }, { name: "GlobalGPT API", endpoint: "/api/globalgpt?content=", method: "GET" }, { name: "GPT V2", endpoint: "/api/gpt?prompt=", method: "GET" }, { name: "ChatGpt With Continues Conversation", endpoint: "/api/gptcovo?ask=&id=", method: "GET" }, { name: "Google Schoolar API", endpoint: "/api/gs?q=", method: "GET" }, { name: "Hercai API", endpoint: "/api/hercai?content=", method: "GET" }, { name: "Instagram  Stalk User API", endpoint: "/api/instagram?/stalk?ig=", method: "GET" }, { name: "IP LOCATOR API", endpoint: "/api/ip?ipnum=", method: "GET" }, { name: "Pinterest API", endpoint: "/api/pin?title=&count=", method: "GET" }, { name: "Remini API", endpoint: "/api/remini?imageUrl=", method: "GET" }, { name: "Remove Background API", endpoint: "/api/rbg?imageUrl=", method: "GET" }, { name: "Tiktok Stalk User", endpoint: "/api/tikstalk?unique_id=", method: "GET" }, { name: "Tiktok SearchAPI", endpoint: "/api/tiktok/searchvideo?keywords=", method: "GET" }, { name: "Tiktok Downloader API", endpoint: "/api/tikdl?url=", method: "GET" }, { name: "Tinyurl API", endpoint: "/api/tinyurl?url=", method: "GET" }, { name: "Twitter Downloader API", endpoint: "/api/twitter?url=", method: "GET" }, { name: "Temporary Email Via Yopmail API", endpoint: "/api/create", endpoint: "/api/mes?read=",
 method: "GET" },
 
];

// Function to populate the API list
function populateAPIs() {
    const apiList = document.getElementById("apiList");
    apiList.innerHTML = "";

    deployedAPIs.forEach(api => {
        const apiItem = document.createElement("a");
        apiItem.className = "relative p-4 border rounded bg-white api-item";
        apiItem.href = api.endpoint;
        apiItem.target = "_blank";

        const apiName = document.createElement("div");
        apiName.className = "font-bold mb-2 text-blue-800";
        apiName.textContent = `Api Name: ${api.name}`;

        const endpoint = document.createElement("div");
        endpoint.className = "text-gray-600 mb-1";
        endpoint.textContent = `Endpoint: ${api.endpoint}`;

        const method = document.createElement("span");
        method.className = "method";
        method.setAttribute("data-method", api.method);
        method.textContent = `${api.method}`;

        apiItem.appendChild(apiName);
        apiItem.appendChild(endpoint);
        apiItem.appendChild(method);

        apiList.appendChild(apiItem);
    });
}

// Populate the API list on page load
populateAPIs();
