import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Récupérer le token dans le header Authorization

    const authHeader = req.headers.authorization; // Récupère l'en-tête Authorization de la requête c'est dire cherche l'information d'autorisation "le token "
    console.log("Header reçu:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "Access denied" });
    }

    // 2. Extraire le vrai token (enlever le mot "Bearer ")
    const token = authHeader.split(" ")[1]; //split(" ") coupe la string à chaque espace et crée un tableau. / Coupe "Bearer eyJhbGci..." en deux parties et récupère uniquement le token

    // 3. Si pas de token → erreur 401
    if (!token) {
      return res.status(401).json({ message: " Access denied" });
    }

    // 4. Vérifier le token avec jwt.verify()
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie que le token est valide grâce à la clé secrète et retourne les données décodées

    req.user = decoded; // Attache les données de l'utilisateur (son id) à la requête pour les utiliser dans le controller ceux qui permet de savoir quel utilisateur fait la demande.

    // 5. Si valide → next() pour continuer
    next(); // Tout est ok, on passe au controller suivant.

    // 6. Si invalide → erreur 401
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
