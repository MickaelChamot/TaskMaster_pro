import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

export const getTasks = async (token) => {
  const response = await api.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const createTask = async (token, title, description) => {
  const response = await api.post(
    "/tasks",
    { title, description },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
export const updateTask = async (token, id, title, description) => {
  const response = await api.put(
    `/tasks/${id}`,
    { id, title, description },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
export const deleteTask = async (token, id) => {
  const response = await api.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
