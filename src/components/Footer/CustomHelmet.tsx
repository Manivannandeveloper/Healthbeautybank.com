import { API_URL } from "data/authors";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const CustomHelmet = () => {
    const location = useLocation()
    const [getLocation, setLocation] = useState('Health Beauty Bank');
    const [title, setTitle] = useState('Health Beauty Bank');
    const [description, setDescription] = useState('');
    useEffect( () => {
        const locPath = window.location.pathname;
        setLocation(locPath.toString());
    }, [location, getLocation]);

    useEffect(() => {
        if(getLocation !== ''){
        fetch(API_URL+'thexbossapi/web/site/seolist', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            url: getLocation
            }),
        }).then((res) => res.json())
        .then((data) => {
            setTitle(data.title);
            setDescription(data.desc);
        })
        .catch(console.log);
        }
    },[getLocation]);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} /> 
        </Helmet>

    );
};

export default CustomHelmet;
