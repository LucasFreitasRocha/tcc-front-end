import  React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

const pages = [ {id:1 , label: 'turmas'},{id:2 , label: 'temas'} , {id:3 , label: 'ranking'} ];


 const NavBarTcc = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const handleActiveMenu = () => { 
    setActiveMenu(!activeMenu)
  }
  return (
    <header>
      <nav className="nav">
        <Link to={"/"} className="logo link">TCC</Link>
        <div className={activeMenu ? 'mobile-menu active' : 'mobile-menu' }  onClick={handleActiveMenu}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
        <ul className={activeMenu ? 'nav-list active' : 'nav-list' } >
        {pages.map((page) => (
          <li key={page.id}  className={activeMenu ? 'active' : ''}><Link className='link'  to={`/${page.label}`}>{page.label}</Link></li>
        ))}
        </ul>
      </nav>
    </header>
  );
};
export default NavBarTcc;