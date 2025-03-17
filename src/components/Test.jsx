import React, { useEffect } from 'react';

const baseUrl = 'https://google-search72.p.rapidapi.com';

const Test = () => {
    const getResults = async (url) => {
        const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '605a28084amshc399f26fd326f2ep11dff4jsn10fad76d32a3',
            'x-rapidapi-host': 'google-search72.p.rapidapi.com'
        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getResults('https://google-search72.p.rapidapi.com/search?q=Apple&num=10');
    }, []);

    return <div>Test</div>;
};

export default Test;
