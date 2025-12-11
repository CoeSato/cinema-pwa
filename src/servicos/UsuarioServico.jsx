import { getToken } from "../seguranca/Autenticacao";

const url = `${process.env.REACT_APP_ENDERECO_API}/usuario`;

export const getUsuarioAPI = async () => {
  const token = getToken();
  const response = await fetch(url, {
    headers: {
      Authorization: `${token}`
    }
  });
  return await response.json();
};

export const atualizaUsuarioAPI = async (usuario) => {
  const token = getToken();
  console.log("Atualizando usuário:", token);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}` 
    },
    body: JSON.stringify(usuario)
  });
  return await response.json();
};
