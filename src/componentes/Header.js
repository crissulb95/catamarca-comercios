import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import PropTypes from 'prop-types';

const Header = ({ updateInfo, updateEnBusqueda }) => {

    const [ tags, updateTags ] = useState([]);
    const [ name, updateName ] = useState({
        name: '',
        tags: ''
    });

    const handleChange = e => {
        updateName({
            ...name,
            [ e.target.name ] : e.target.value
        });        
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateInfo({
            ...name
        });
        if( name.name === '' || name.tags === '') {
            updateEnBusqueda(false);
            return;
        } else {
            updateEnBusqueda(true);
            return;
        }
    }

    useEffect( () => {
        const consultaApi = async () => {

            const url=`https://tarjetafamilia.catamarca.gob.ar/api/v1/commerce-tags/`;
            const resultado = await Axios( url );
            updateTags( resultado.data.data );

        };
        consultaApi();
    }, [] );

    return ( 
        <Barra
            onSubmit={ handleSubmit }
            id='formulario'
        >
            <Title>Comercios en Catamarca</Title>
            <InputText
                type='text'
                name='name'
                placeholder='Escriba el nombre del comercio'
                onChange={ e => handleChange( e ) }
            />
            <Search
                name='tags'
                onChange={ e => handleChange( e ) }
            >
                <option value=''>--Tipo de comercio--</option>
                { tags.map( tag => (
                    <option key={ tag.id } value={ tag.attributes.name }>{ tag.attributes.name }</option>
                ) ) }
            </Search>
            <Boton
                type='submit'
            >¡Buscar comercio!</Boton>
        </Barra>
     );
}


const InputText = styled.input`
    flex: 0 0 24%;
    width: 100%;
    margin: 0 auto .7rem auto;
    padding: 0.5rem;
    border: 1px solid grey;
    border-radius: .7rem;
`;

const Title = styled.h2`
    flex: 0 0 24%;
    width: 100%;
    margin: 0 auto .7rem auto;
    font-size: 1.2rem;
    font-weight: 100;
    text-align: center;
    text-transform: uppercase;
`;

const Search = styled.select`
    flex: 0 0 24%;
    width: 100%;
    margin: 0 auto .7rem auto;
    padding: 0.5rem;
    border: 1px solid grey;
    border-radius: .7rem;
`;

const Boton = styled.button`
    flex: 0 0 24%;
    width: 100%;
    margin: 0 auto .7rem auto;
    border: none;
    border-radius: .7rem;
    padding: .5rem;
    background: #3A6073;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    transition: .3s ease-in-out;

    &:hover {
        background: #16222A;
    }
`;

const Barra = styled.form`
    background: white;
    padding: 0.5rem;
    padding-top: 1rem;
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px ) {
        flex-direction: row;
    }
`;


Header.propTypes = {
    updateInfo: PropTypes.func.isRequired, 
    updateEnBusqueda: PropTypes.func.isRequired
}

export default Header;