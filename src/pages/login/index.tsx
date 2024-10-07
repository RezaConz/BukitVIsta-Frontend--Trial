import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../component/login-form";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");
    const success = await login(username, password);
    if (success) {
      navigate("/products");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen space-y-8'>
      <h2 className=''>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
}

export default LoginPage;
