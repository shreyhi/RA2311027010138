import axios from "axios";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

// 👉 Paste your token here after generating
let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiYXJhbndhbHNocmV5OTJAZ21haWwuY29tIiwiZXhwIjoxNzc3Njk5MTEyLCJpYXQiOjE3Nzc2OTgyMTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0Njk4Mzc1Yy02ZjM4LTQxNWMtYjIxNC03YTNkY2IzZjBkNDMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaHJleSIsInN1YiI6IjM4MjM5NThiLTBjMWYtNGYzYi04YzllLTMwZjlkMmFhZjg4ZiJ9LCJlbWFpbCI6ImJhcmFud2Fsc2hyZXk5MkBnbWFpbC5jb20iLCJuYW1lIjoic2hyZXkiLCJyb2xsTm8iOiJyYTIzMTEwMjcwMTAxMzgiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiIzODIzOTU4Yi0wYzFmLTRmM2ItOGM5ZS0zMGY5ZDJhYWY4OGYiLCJjbGllbnRTZWNyZXQiOiJEdW1RcVpReGVYVUhVbWVFIn0.6gZxumo4jx_QQ3SzssP6imFUQkCWxgPYrBU-uDtLOXA";

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