import axios from "axios";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

// 👉 Paste your token here after generating
let TOKEN = "PASTE_YOUR_ACCESS_TOKEN";

export const Log = async (stack, level, pkg, message) => {
  try {
    const res = await axios.post(
      LOG_API,
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Log success:", res.data);
  } catch (err) {
    console.log("Log error:", err.response?.data || err.message);
  }
};