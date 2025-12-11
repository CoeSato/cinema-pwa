import React, { useState, useEffect } from 'react';
import FilmeContext from './FilmeContext';
import { getDiretoresAPI } from '../../../servicos/DiretorServico';
import { getFilmesAPI, getFilmesPorCodigoAPI, deleteFilmePorCodigoAPI, cadastraFilmeAPI} from '../../../servicos/FilmeServico';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Filme() {
    let navigate = useNavigate();
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaDiretores, setListaDiretores] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaFilmes = async () => {
        setCarregando(true);
        setListaObjetos(await getFilmesAPI());
        setCarregando(false);
    }

    
    const recuperaDiretores = async () => {
        setListaDiretores(await getDiretoresAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteFilmePorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaFilmes();
            } catch (error) {
                console.error("Erro ao remover filme:", error);
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaFilmes();
        recuperaDiretores();        
    }, []);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        codigo: 0,
        nome: "",
        data_lancamento: "",
		diretor_id: 0,
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            data_lancamento: "",
            diretor_id: 0,
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getFilmesPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (error) {
            console.error("Erro ao buscar filme para edição:", error);
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraFilmeAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            if (!editar) {
                setObjeto({ codigo: 0, nome: "", data_lancamento: "", diretor_id: 0 });
            }
        } catch (err) {
            console.error(err.message);
            navigate("/login", { replace: true });
        }
        setExibirForm(false);
        recuperaFilmes(); 
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }


    return (
        <FilmeContext.Provider value={
            {
                listaObjetos,
                listaDiretores,
                setListaDiretores,
                setListaObjetos,
                remover,
                novoObjeto,
                editarObjeto,
                acaoCadastrar,
                handleChange,
                objeto,
                setObjeto,
                editar,
                setEditar,
                exibirForm,
                setExibirForm
            }
        }>
            <Alerta alerta={alerta} />
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </FilmeContext.Provider>
    );
}

export default WithAuth(Filme);