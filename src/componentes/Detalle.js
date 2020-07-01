import React, { Fragment } from 'react';
import PropTypes from 'prop-types'

const Detalle = ({ detalles }) => {

    const { name, address, tags } = detalles.attributes;
 
    return ( 
        <Fragment>
            <h3>{name}</h3>
            <p>{address}</p>
            <p>{tags.join(', ')}</p>
        </Fragment>
     );
}

Detalle.propTypes = {
    detalles: PropTypes.object.isRequired
}
 
export default Detalle;