import axios from "axios";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";
let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiYXJhbndhbHNocmV5OTJAZ21haWwuY29tIiwiZXhwIjoxNzc3NzAxNDUzLCJpYXQiOjE3Nzc3MDA1NTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwNmM0MjhiNS01MWU5LTQ2ODMtYWNlNS02YTNjN2RiNzI5OTciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaHJleSIsInN1YiI6IjM4MjM5NThiLTBjMWYtNGYzYi04YzllLTMwZjlkMmFhZjg4ZiJ9LCJlbWFpbCI6ImJhcmFud2Fsc2hyZXk5MkBnbWFpbC5jb20iLCJuYW1lIjoic2hyZXkiLCJyb2xsTm8iOiJyYTIzMTEwMjcwMTAxMzgiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiIzODIzOTU4Yi0wYzFmLTRmM2ItOGM5ZS0zMGY5ZDJhYWY4OGYiLCJjbGllbnRTZWNyZXQiOiJEdW1RcVpReGVYVUhVbWVFIn0.ZwWuOe_rdxkMlanW-nn38YQ9xY67jqDYTeUk1ceC9_I";

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