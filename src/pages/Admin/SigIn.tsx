import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from '../../services/lib/axios'
import Input from "../../components/Input";


function SigIn() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const Register = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      toast.error("Preencha todos os campos.");
      console.error("Preencha todos os campos.")
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Email inválido. Tente novamente.");
      console.error("Email inválido.")
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      console.error("A senha deve ter no mínimo 6 caracteres.")
      return;
    }

    setLoading(true); 

    try {
      const { status } = await axios.post(
        "api/register",
        { nome, email, senha }
      );

      if (status === 200 || status === 201) {
        toast.success("Login feito com sucesso! Faça login para continuar.");
        console.log("Login realizado! Faça login para continuar.")
        // 🔒 O cookie de sessão vem do backend
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error("Erro ao realizar cadastro.");
        console.error("Erro ao realizar cadastro")
      }
    } catch (error: any) {
      console.error("❌ Erro no servidor ao tentar fazer login:", error);
      toast.error("Erro no servidor ao tentar fazer login.");
      if (error.response?.status === 409) {
        toast.error("Este email já está em uso.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col items-center"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Painel Register
          </h1>

          <form
            onSubmit={Register}
            className="w-full flex flex-col gap-4"
          >

            <div>
              <label
                htmlFor="nome"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Nome
              </label>
              <Input 
              id="nome"
              value={nome}
              type="text"
              onChange={(e) => setNome(e.target.value)} 
              title="email"
              placeholder="Your name here"
              addClassName="text-gray-700 focus:ring-1 focus:ring-[#ba5511]"
              required />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Email
              </label>
              <Input 
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)} 
              title="email"
              placeholder="admin@example.com"
              addClassName="text-gray-700 focus:ring-1 focus:ring-[#ba5511]"
              required />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Senha
              </label>
              <Input
                id="password"
                type="password"
                title="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="******"
                addClassName="text-gray-700 focus:ring-1 focus:ring-[#ba5511]"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className={`mt-4 flex cursor-pointer justify-center items-center gap-2 bg-[#b95411] hover:bg-[#99460e] text-white font-bold py-2 rounded-lg transition ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                  }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Cadastrar"
              )}
            </motion.button>

            <div className="flex items-center">
              <Link to="/login" className="text-xs text-[#b95411] hover:text-[#99460e]">Fazer Login</Link>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SigIn;