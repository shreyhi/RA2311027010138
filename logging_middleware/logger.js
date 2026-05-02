import axios from "axios";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";
let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiYXJhbndhbHNocmV5OTJAZ21haWwuY29tIiwiZXhwIjoxNzc3NzAyMTgxLCJpYXQiOjE3Nzc3MDEyODEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4YjZjODk0OC03OWRiLTQzYmYtOTc2MS1jY2QzN2FlMzkzZWUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaHJleSIsInN1YiI6IjM4MjM5NThiLTBjMWYtNGYzYi04YzllLTMwZjlkMmFhZjg4ZiJ9LCJlbWFpbCI6ImJhcmFud2Fsc2hyZXk5MkBnbWFpbC5jb20iLCJuYW1lIjoic2hyZXkiLCJyb2xsTm8iOiJyYTIzMTEwMjcwMTAxMzgiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiIzODIzOTU4Yi0wYzFmLTRmM2ItOGM5ZS0zMGY5ZDJhYWY4OGYiLCJjbGllbnRTZWNyZXQiOiJEdW1RcVpReGVYVUhVbWVFIn0.ueWs5T_K3qhP0aX7rZO__8Bjm6XtTaXfiABnpRE0XQc";

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