import React, {useEffect, useState}   from 'react';
import { useHistory} from 'react-router-dom';



export default function Home() {
  const jwt = localStorage.getItem('jwt');
  const [name, setName] = useState(''); 
  const history = useHistory();
  useEffect(() => {
    console.log('iniciando...');
    console.log(jwt);
    if(!jwt){
      history.push("/login");
    }
    setName('Lucas');
  }, [jwt])
  return (
    <>
      <h1>hello world {name} !</h1>
    </>
  );
}