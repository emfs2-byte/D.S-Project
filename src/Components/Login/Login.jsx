import CliniDeskLogo from './CliniDeskLogo';
import { FaUser, FaLock } from "react-icons/fa";
import { Calendar, Shield, MessageCircle } from "lucide-react";
import "../../styles/Login.css";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";

const Login = () => {
  return (
    <div className="main">

      <div className="left">
        <CliniDeskLogo />

        <div className="features">
          
          <div className="feature-item">
            <div>
              <Calendar />
            </div>
            <span>Agendamentos em tempo real</span>
          </div>

          <div className="feature-item">
            <div>
              <Shield />
            </div>
            <span>Acesso seguro por setor</span>
          </div>

          <div className="feature-item">
            <div>
              <MessageCircle />
            </div>
            <span>Integração com WhatsApp</span>
          </div>

        </div>
      </div>

      <div className="right">
        <form className="container">
          <h1>Bem-vindo ao CliniDesk</h1>
          <p>Faça login para acessar o painel</p>

          <div className="input-box">
            <FaUser className="left-icon" />
            <input type="text" placeholder="Ex: abcd" />
          </div>

          <div className="input-box">
            <FaLock className="left-icon" />
            <input type="password" placeholder="******" />
            <span className="eye">👁</span>
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" /> Lembrar de mim
            </label>
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit">Entrar</button>

          <div className="signup-link">
            <p>Não tem uma conta? <a href="#">Criar conta</a></p>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
