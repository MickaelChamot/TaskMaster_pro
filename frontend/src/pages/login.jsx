import { useState } from "react";
import { login } from "../services/api.js";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(""); // useState permet de stocker et mettre à jours les données

  const [password, setPassword] = useState(""); // Crée une variable password avec sa valeur initiale vide et setPassword pour la mettre à jour

  const navigate = useNavigate(); // Initialise la fonction navigate qui permet de rediriger l'utilisateur vers une autre page

  const { login: loginContext } = useAuth(); // Récupère la fonction login du context et la renomme loginContext pour éviter le conflit avec la fonction login importée depuis api.js

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // On appel le login
      const data = await login(email, password);

      // On appel logincontext de l'utilisateur et du token
      loginContext(data.user, data.token);

      // Pour rediriger vers le dashboard :
      navigate("/dashboard");
    } catch (error) {
      console.log("Erreur de Login:", error.message);
    }
  };

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Vote Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Votre mots de passe"
      />

      <button onClick={handleSubmit}> Se connecter </button>
    </>
  );
}

export default Login;
