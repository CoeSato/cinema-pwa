import { useState, useEffect } from 'react';
import DiretorContext from './DiretorContext';
import { getDiretoresAPI, getDiretorPorCodigoAPI, deleteDiretorPorCodigoAPI, cadastraDiretorAPI } from '../../../servicos/DiretorServico';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Diretor() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperaDiretores = async () => {
        setCarregando(true);
        setListaObjetos(await getDiretoresAPI());
        setCarregando(false);
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getDiretorPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (error) {
            navigate("/login", { replace: true });
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraDiretorAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            if (!editar) {
                // If it was a new item, maybe clear the form state or keep it if needed
                setObjeto({ codigo: 0, nome: "" }); // Clear the form state for new item
            }
        } catch (err) {
            console.error(err.message);
            navigate("/login", { replace: true });
        }
        setExibirForm(false); // Close the form on successful save
        recuperaDiretores(); // Refresh the list
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteDiretorPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaDiretores();
            } catch (error) {
                console.error("Erro ao remover diretor:", error);
                setAlerta({ status: "error", message: "Erro ao remover diretor." });
                navigate("/login", { replace: true });
            }
        }
    };

    const toggleForm = (show) => {
        setExibirForm(show);
        if (!show) {
            setAlerta({ status: "", message: "" });
        }
    }

    useEffect(() => {
        recuperaDiretores();
    }, []);

    return (
        <DiretorContext.Provider value={
            {
                objeto, setObjeto, editar, setEditar,
                listaObjetos, setListaObjetos, alerta, setAlerta,
                exibirForm, setExibirForm, novoObjeto,
                editarObjeto, acaoCadastrar, handleChange,
                remover, toggleForm, carregando, setCarregando
            }
        }>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </DiretorContext.Provider>
    );
}

export default WithAuth(Diretor);