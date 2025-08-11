import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
                  
function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error('Senhas não coincidem');
    const ok = await register(name.trim(), email.trim(), password);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg bg-[#feebee] shadow-sm">
        <h1 className="p-6 text-5xl font-bold text-[#f68597]">Registrar-se</h1>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <label className="text-[#4bb9ba] font-medium">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border-input 
                     bg-white px-3 py-2 text-[#f68597] 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    file:text-foreground placeholder:text-[#f68597]
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[#4bb9ba] font-medium">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border-input 
                     bg-white px-3 py-2 text-[#f68597] 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    file:text-foreground placeholder:text-[#f68597]
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-[#4bb9ba] font-medium">Senha</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border-input 
                     bg-white px-3 py-2 text-[#f68597] 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    file:text-foreground placeholder:text-[#f68597]
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>

            {/* Confirmação de Senha */}
            <div className="space-y-2">
              <label className="text-[#4bb9ba] font-medium">
                Confirme a senha
              </label>
              <input
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border-input 
                     bg-white px-3 py-2 text-[#f68597] 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    file:text-foreground placeholder:text-[#f68597]
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>

            {/* Botão de Registro */}
            <button
              type="submit"
              disabled={isLoading}
              className="
    w-full                     
    bg-[#f68597]               
    text-white               
    font-medium               
    px-4 py-2                  
    rounded-md                 
    shadow-md                  
    hover:bg-[#e76a88]        
    focus:outline-none         
    focus:ring-2               
    focus:ring-[#f68597]      
    transition                 
    duration-200              
  "
            >
              {isLoading ? 'Carregando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterForm;
