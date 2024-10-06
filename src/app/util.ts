export const api_base = process.env.NODE_ENV === "development" ? "http://localhost:8080/api" : "https://workout-note-api.onrender.com/api";
export const ws_base = process.env.NODE_ENV === "development" ? "wss://localhost:8080/ws/" : "ws://workout-note-api.onrender.com/ws/";
export const times_array = ["平日午前", "平日午後", "平日夜間", "土日午前", "土日午後", "土日夜間"];