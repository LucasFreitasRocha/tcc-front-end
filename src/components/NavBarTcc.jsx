import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "./index.css";

const pages = [
  { id: 'page1', label: 'turmas' },
 { id: 'page2', label: 'temas' },
 { id: 'page3', label: 'Questoes' },
  { id: 'page4', label: 'ranking' }, 
  { id: 'page5', label: 'Logoff' }];


const NavBarTcc = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const jwt = localStorage.getItem('jwt');
  const history = useHistory();

  const handleActiveMenu = () => {
    setActiveMenu(!activeMenu)
  }

  useEffect(() => {
    if (!jwt) {
      history.push("/login");
    }

  }, [history, jwt])
  const handleLogoff = () => {
    localStorage.setItem('jwt', '');
    history.push("/login");
  }
  return (
    <header>
      <nav className="nav">
        <Link to={"/"} className="logo link">TCC</Link>
        <div className={activeMenu ? 'mobile-menu active' : 'mobile-menu'} onClick={handleActiveMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className={activeMenu ? 'nav-list active' : 'nav-list'} >
          {pages.map((page) => (
          
              <li key={page.id} className={activeMenu ? 'active' : ''}>
                {(page.label === 'Logoff')? 
                <span className='link' onClick={handleLogoff}>{page.label} </span> :
                <Link className='link' to={`/${page.label}`}>{page.label}</Link>
                }
              </li> 
        ))}
        </ul>
      </nav>
    </header>
  );
};
export default NavBarTcc;