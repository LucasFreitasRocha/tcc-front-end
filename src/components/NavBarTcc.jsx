import * as React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

const pages = [ {id:1 , label: 'turmas'},{id:2 , label: 'temas'} , {id:3 , label: 'ranking'} ];
const settings = ['Profile',  'Logout'];

 const NavBarTcc = () => {
 

  return (
    <header>
      <nav className="nav">
        <Link to={"/"} className="logo link">TCC</Link>
        <ul className="link nav-list">
        {pages.map((page) => (
          <li key={page.id} ><Link className="link" to={`/${page.label}`}>{page.label}</Link></li>
        ))}
        </ul>
      </nav>
    </header>
  );
};
export default NavBarTcc;