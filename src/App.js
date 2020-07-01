import React, { Fragment, useState, useEffect } from 'react';
import Maps from './componentes/Maps';
import Header from './componentes/Header';
import Axios from 'axios';
import styled from 'styled-components';

function App() {

  const mapCenter = [ -28.466667, -65.783333 ];
  const zoom = 12;

  const [ info, updateInfo ] = useState({});
  const [ allCommerce, updateAllCommerce ] = useState([]);
  const [ enBusqueda, updateEnBusqueda ] = useState(false);

  useEffect( () => {
    if( enBusqueda === false ){
      const comercios = async () => {

      const url = 'https://tarjetafamilia.catamarca.gob.ar/api/v1/commerce/';
      const resultado = await Axios(url);

      updateAllCommerce(resultado.data.data);
      
      }
      
      comercios();
      return;
    }
    
  }, [ enBusqueda ] );

  return (
    <Fragment>
      <Header 
        updateInfo={ updateInfo }
        updateEnBusqueda={ updateEnBusqueda }
      />
      <div className='container'>
        <Maps 
          center={ mapCenter } 
          zoom={ zoom } 
          info={ info }
          allCommerce={ allCommerce }
        />
      </div>
      <Saludo>Hecho en React para el curso de FrontEnd del Programa para la Inserción Laboral en la Industria del Software con IncluIT, hecho por Cristian Sulbaran &copy;2020</Saludo>
    </Fragment>
  );
}

const Saludo = styled.p`
  margin-top: 4rem;
  color: #fff;
  font-weight: 100;
  font-size: .8rem;
  text-align: center; 
  text-transform: uppercase;
`;

export default App;
