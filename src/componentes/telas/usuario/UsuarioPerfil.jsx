import { useEffect, useState } from 'react';
import { getUsuarioAPI, atualizaUsuarioAPI } from '../../../servicos/UsuarioServico';
import CampoEntrada from '../../comuns/CampoEntrada';
import Alerta from '../../comuns/Alerta';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function UsuarioPerfil() {
  const [usuario, setUsuario] = useState({});
  const [alerta, setAlerta] = useState({ status: "", message: "" });

  useEffect(() => {
    getUsuarioAPI().then(setUsuario);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validação básica
    if (!usuario.nome || !usuario.telefone || !usuario.tipo || !usuario.senha) {
      setAlerta({ status: "error", message: "Preencha todos os campos obrigatórios." });
      return;
    }

    try {
      const resposta = await atualizaUsuarioAPI(usuario);

      if (resposta.status === "success") {
        setAlerta({ status: "success", message: "Dados atualizados com sucesso!" });
      } else {
        setAlerta({ status: "error", message: resposta.message || "Erro ao atualizar." });
      }

    } catch (err) {
      console.error(err);
      setAlerta({ status: "error", message: err.message || "Erro desconhecido ao atualizar." });
    }
  };

  return (
    <Container className="mt-4">
      <h3>Editar dados</h3>
      <Alerta alerta={alerta} />
      <form onSubmit={handleSubmit}>
        <CampoEntrada label="Nome" name="nome" value={usuario.nome || ''} onchange={handleChange} requerido={true} />
        <CampoEntrada label="Email" name="email" value={usuario.email || ''} readonly={true} />
        <CampoEntrada label="Telefone" name="telefone" value={usuario.telefone || ''} onchange={handleChange} requerido={true} />
        <CampoEntrada label="Tipo" name="tipo" value={usuario.tipo || ''} onchange={handleChange} requerido={true} />
        <CampoEntrada label="Senha" name="senha" value={usuario.senha || ''} onchange={handleChange} requerido={true} tipo="password" />
        <Button variant="primary" type="submit" className="mt-2">Salvar</Button>
      </form>
    </Container>
  );
}

export default UsuarioPerfil;
