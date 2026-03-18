import { useState } from "react";

function Login() {
  const [email, setEmail] = useState(""); // useState permet de stocker et mettre à jours les données
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
