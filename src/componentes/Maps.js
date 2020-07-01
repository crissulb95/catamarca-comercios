import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet';
import Axios from 'axios';

const Maps = ({ center, zoom, info, allCommerce }) => {

    const defMarker = () => {
    
        let a;

        if( typeof info.name === 'undefined' || info.name === '' || typeof info.tags === 'undefined' || info.tags === '' ) {
        a = allCommerce.map( comercio => ( //ESTO ESTA BIEN 
        <Marker 
            key={ comercio.id }
            position={ Coordenadas(comercio.attributes) }
        />
            ));   
        return a;    
    } else {
        const b = allCommerce.filter( comercio => comercio.attributes.name.toLowerCase().includes((`${info.name}`).toLowerCase()) );

        const c = b.filter( comercio => comercio.attributes.tags.indexOf( info.tags ) >= 0  );

        console.log(c);
        console.log(info.tags === allCommerce[6].attributes.tags[0]);
        console.log(typeof info.tags);
        console.log(typeof allCommerce[6].attributes.tags[0]);
        

        a = c.map( comercio => ( //ESTO ESTA BIEN 
            <Marker 
                key={ comercio.id }
                position={ Coordenadas(comercio.attributes) }
            />
                ));   
            return a; 
    }

    }

    
    const Coordenadas = attributes => {
        
        if (typeof attributes === 'undefined' || typeof attributes.point === 'undefined' || attributes.point === null) {
            return [ 0, 0 ];
        } else {
            return [ attributes.point.coordinates[1], attributes.point.coordinates[0] ] ;
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

            {defMarker()}
             
        </Map>
     );
}
 
export default Maps;