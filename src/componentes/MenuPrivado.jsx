import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Autenticacao';

function MenuPrivado() {

    const usuario = getUsuario();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" exact="true"
                        to="/privado">eShop</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link active" exact="true"
                                to="/privado">Home</NavLink>
                            {usuario &&
                                <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                    <NavLink className="dropdown-item" exact="true"
                                        to="filmes">Filmes</NavLink>
                                    <NavLink className="dropdown-item" exact="true"
                                        to="series">Séries</NavLink>
                                    <NavLink className="dropdown-item" exact="true"
                                        to="diretores">Diretores</NavLink>
                                </NavDropdown>
                            }
                            <NavLink className="nav-link active" exact="true"
                                to="sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={usuario ? "Usuário: " + usuario.nome : "Usuário"} id="basic-nav-dropdown">
                            <NavLink className="dropdown-item" exact="true" to="perfil">
                                Editar Dados
                            </NavLink>
                            {usuario ?
                                <NavLink className="dropdown-item" exact="true"
                                    to="/" onClick={() => logout()}>Logout</NavLink>
                                :
                                <NavLink className="dropdown-item" exact="true"
                                    to="/login">login</NavLink>
                            }
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default MenuPrivado;