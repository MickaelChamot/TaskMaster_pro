import pool from "../config/database.js";

// Créer une tâche
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body; // Récupère le titre et la description envoyés par l'utilisateur

    const userId = req.user.id; // Récupère l'id de l'utilisateur connecté depuis le middleware

    const task = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, userId],
    ); // Insère le titre, la description et l'id de l'utilisateur dans la table tasks et retourne la tâche créée

    res.status(201).json({
      message: " Confirmation successful",
      task: task.rows[0],
    }); // Retourne la confirmation et la tâche créée
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// lîster ses taches
export const getTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      userId,
    ]);

    res.status(200).json({
      message: "Confirmation",
      tasks: tasks.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Marqué une tâche comme terminé
export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await pool.query(
      " UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, taskId, userId],
    );

    res.status(200).json({
      message: " Validation ",
      task: task.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Supprimer une tâche
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const deleteTask = await pool.query(
      " DELETE FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, userId],
    );

    res.status(200).json({
      message: "Message delete",
      task: deleteTask.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
