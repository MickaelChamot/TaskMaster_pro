import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "./config/database.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body; // req.body => permet de récuperer les données envoyées par l'utilisateur.

    // 1. Vérifier que l'email n'existe pas déjà
    const result = await pool.query(" SELECT id FROM users WHERE email = $1 ", [
      email,
      // "Cherche dans la table users un utilisateur dont l'email est égal à celui qu'on vient de recevoir"
    ]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: " l'adresse mail existe déjà! " });
    }
    // 2. Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // Comme notre function est async, on peux utiliser await, 10 représente le niveau de sécurité.

    // 3. Enregistrer l'utilisateur en base de données
    const newUser = await pool.query(
      " INSERT INTO users (email, password) VALUES ($1,$2) RETURNING id, email, created_at ",
      [email, hashedPassword]
      // Insère dans la table users un nouvel enregistrement avec l'email et le mot de passe hashé, et renvoie moi les données insérées
    );
    // 4. Créer un token

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // 5. Renvoyer une confirmation avec le token

    res.status(201).json({
      message: " Confirmation avec succes",
      token,
      user: newUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Chercher l'utilisateur par son email dans la base de données
    const resultat = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    // 2. Si l'email n'existe pas, renvoyer une erreur
    if (resultat.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect!" });
    }

    // 3. Vérifier que le mot de passe correspond au hash stocké
    const validPassword = await bcrypt.compare(
      password,
      resultat.rows[0].password
    );
    // 4. Si le mot de passe est incorrect, renvoyer une erreur
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect!" });
    }
    // 5. Créer un token
    const token = jwt.sign(
      { id: resultat.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    // 6  Renvoyer une confirmation avec le token
    res.status(200).json({
      message: "Confirmation validé",
      token,
      user: resultat.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
