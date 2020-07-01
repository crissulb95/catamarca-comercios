import React, { Fragment, useState, useEffect } from 'react';
import Maps from './componentes/Maps';
import Header from './componentes/Header';
import Axios from 'axios';

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
    </Fragment>
  );
}

export default App;
