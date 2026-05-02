import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiYXJhbndhbHNocmV5OTJAZ21haWwuY29tIiwiZXhwIjoxNzc3NzAwNTA4LCJpYXQiOjE3Nzc2OTk2MDgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjYTA3NTkxMi1hY2M3LTRkZDctYjE3Yi01MTIzMzRlZDEyNjUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaHJleSIsInN1YiI6IjM4MjM5NThiLTBjMWYtNGYzYi04YzllLTMwZjlkMmFhZjg4ZiJ9LCJlbWFpbCI6ImJhcmFud2Fsc2hyZXk5MkBnbWFpbC5jb20iLCJuYW1lIjoic2hyZXkiLCJyb2xsTm8iOiJyYTIzMTEwMjcwMTAxMzgiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiIzODIzOTU4Yi0wYzFmLTRmM2ItOGM5ZS0zMGY5ZDJhYWY4OGYiLCJjbGllbnRTZWNyZXQiOiJEdW1RcVpReGVYVUhVbWVFIn0.P5V-Qxi_7sa576hmq_K5VzcCuheTpoYfKDM16xZmB38";

export const fetchNotifications = async () => {
  const res = await axios.get(
    "http://20.207.122.201/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  return res.data.notifications;
};