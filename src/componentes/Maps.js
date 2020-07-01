import React from 'react';
import ModuloFiltro from './ModuloFiltro';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';

const Maps = ({ center, zoom, info, allCommerce }) => {
    
    return ( 
        <Map
            center={ center }
            zoom={ zoom }
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />

            <ModuloFiltro 
                allCommerce={ allCommerce }
                info={ info }
            />
             
        </Map>
     );
}
 


Maps.propTypes = {
    center: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired, 
    info: PropTypes.object.isRequired, 
    allCommerce: PropTypes.array.isRequired
}

export default Maps;