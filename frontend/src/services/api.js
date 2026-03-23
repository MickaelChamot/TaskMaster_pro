// Import de la librairie axios pour faire des requêtes HTTP
import axios from "axios";

// Création d'une instance axios avec l'URL de base du backend
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Fonction qui envoie une requête POST au backend pour connecter un utilisateur
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data; // Retourne les données reçues du backend (token, user)
};

// Fonction qui envoie une requête POST au backend pour inscrire un nouvel utilisateur
export const register = async (email, password) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data; // Retourne les données reçues du backend (token, user)
};

// Fonction qui envoie une requête GET au backend pour récupérer toutes les tâches de l'utilisateur
export const getTasks = async (token) => {
  const response = await api.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` }, // Envoie le token JWT dans le header pour prouver que l'utilisateur est connecté
  });
  return response.data; // Retourne la liste des tâches
};

// Fonction qui envoie une requête POST au backend pour créer une nouvelle tâche
export const createTask = async (token, title, description) => {
  const response = await api.post(
    "/tasks",
    { title, description }, // Données de la tâche envoyées dans le body
    {
      headers: { Authorization: `Bearer ${token}` }, // Token JWT pour l'authentification
    },
  );
  return response.data; // Retourne la tâche créée
};

// Fonction qui envoie une requête PUT au backend pour modifier une tâche existante
export const updateTask = async (token, id, title, description) => {
  const response = await api.put(
    `/tasks/${id}`, // L'id de la tâche est intégré dans l'URL
    { id, title, description }, // Nouvelles données envoyées dans le body
    {
      headers: { Authorization: `Bearer ${token}` }, // Token JWT pour l'authentification
    },
  );
  return response.data; // Retourne la tâche modifiée
};

// Fonction qui envoie une requête DELETE au backend pour supprimer une tâche
export const deleteTask = async (token, id) => {
  const response = await api.delete(
    `/tasks/${id}`, // L'id de la tâche est intégré dans l'URL
    {
      headers: { Authorization: `Bearer ${token}` }, // Token JWT pour l'authentification
    },
  );
  return response.data; // Retourne la confirmation de suppression
};
