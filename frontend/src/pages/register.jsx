import { useState } from "react";
import { register } from "../services/api.js";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // On appel le login
      const data = await register(email, password);

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

      <button onClick={handleSubmit}> Créer le compte </button>
    </>
  );
}

export default Register;
