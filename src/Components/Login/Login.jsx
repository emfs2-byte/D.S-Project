import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  return (
    <div className="main">

      {/* LADO ESQUERDO */}
      <div className="left">
        <h1>CliniDesk</h1>
        <p>Sua recepção, no controle</p>

        <div className="features">
          <p>Agendamentos em tempo real</p>
          <p>Acesso seguro por setor</p>
          <p>Integração com WhatsApp</p>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="right">
        <form className="container">
          <h1>Bem-vindo ao CliniDesk</h1>
          <p>Faça login para acessar o painel</p>

          {/* USUÁRIO */}
          <div className="input-box">
            <input type="text" placeholder="Ex: abcd" />
            <FaUser className="icon" />
          </div>

          {/* SENHA */}
          <div className="input-box">
            <input type="password" placeholder="******" />
            <FaLock className="icon" />
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembrar de mim
            </label>
            <a href="#">Esqueci minha senha</a>
          </div>

          <button>Entrar</button>

          <div className="signup-link">
            <p>
              Não tem uma conta? <a href="#">Criar conta</a>
            </p>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;