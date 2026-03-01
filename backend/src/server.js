import express from "express";
import pool from "./config/database.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Serveur démarré et base de donné connectée ✅ ");
  } catch (error) {
    console.log("Erreur de connetion à la base de donnée ❌");
  }
});
