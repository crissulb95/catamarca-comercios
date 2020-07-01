import React, { Fragment, useState } from 'react';
import { Marker, Popup } from 'react-leaflet'
import Detalle from './Detalle';
import PropTypes from 'prop-types';

const ModuloFiltro = ({ allCommerce, info }) => {

    const [ detalles, updateDetalles ] = useState(null);
    

    const defMarker = () => {
    
    let a;

    if( typeof info.name === 'undefined' || info.name === '' || typeof info.tags === 'undefined' || info.tags === '' ) {
    a = allCommerce.map( comercio => ( //ESTO ESTA BIEN 
        <Marker 
            key={ comercio.id }
            position={ Coordenadas(comercio.attributes) }
            onClick={ () => {
                updateDetalles( comercio );
            } }
        />
        ));   
    return a;    
} else {
    const b = allCommerce.filter( comercio => comercio.attributes.name.toLowerCase().includes(( `${info.name}` ).toLowerCase() ) );

    const c = b.filter( comercio => comercio.attributes.tags.indexOf( info.tags ) >= 0  );

    a = c.map( comercio => ( //ESTO ESTA BIEN 
        <Marker 
            key={ comercio.id }
            position={ Coordenadas(comercio.attributes) }
            onClick={ () => {
                updateDetalles( comercio );
            } }
        />
            ));   
        return a; 
}

}

const Coordenadas = attributes => {
        
    if ( typeof attributes === 'undefined' || typeof attributes.point === 'undefined' || attributes.point === null ) {
        return [ 0, 0 ];
    } else {
        return [ attributes.point.coordinates[1], attributes.point.coordinates[0] ] ;
    };
  };

    return ( 
    <Fragment>
        { defMarker() }
        { detalles && (
            <Popup
                position={ Coordenadas(detalles.attributes) }
                onClose={ () => {
                    updateDetalles( null );
                } }
            >   <Detalle 
                    detalles={ detalles }
                />
            </Popup>
        ) }
    </Fragment>
     );
}
 

ModuloFiltro.propTypes = {
    allCommerce: PropTypes.array.isRequired,
    info: PropTypes.object.isRequired
}

export default ModuloFiltro;