import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet';
import Axios from 'axios';

const Maps = ({ center, zoom, info, allCommerce }) => {

    const [ filtrado, filtradoUpdate ] = useState(false);
    const [ comercio, updateComercio ] = useState({});

    useEffect( () => {
        if( typeof info.name === 'undefined' || typeof info.tags === 'undefined') {
            filtradoUpdate(false);
            return;
        }
        const llamado = async () => {
            const url = `https://tarjetafamilia.catamarca.gob.ar/api/v1/commerce/?name=${info.name}&tags=${info.tags}`;
            const resultado = await Axios(url);
            console.log(resultado.data.data);
            updateComercio(resultado.data.data);
            filtradoUpdate(true);
        }
        llamado();
    }, [ info, allCommerce ] );

    const Coordenadas = (point) => {
        if (point !== null) {
            return [ point.coordinates[1], point.coordinates[0] ];
        } else {
            return [ 0, 0 ]
        };
      };

    return ( 
        <Map
            center={ center }
            zoom={ zoom }
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />

            { filtrado 
            ? 
            <Marker
                key='1'
                position={ Coordenadas(comercio[0].attributes.point) }
            />
            : allCommerce.filter( comercio => comercio.attributes.point !== null ).map( comercio => (
                <Marker
                    key={ comercio.id }
                    position={ [comercio.attributes.point.coordinates[1], comercio.attributes.point.coordinates[0]] }
                />
            ) )  }
        </Map>
     );
}
 
export default Maps;