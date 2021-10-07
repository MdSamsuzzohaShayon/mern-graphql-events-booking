import React from 'react';
import keys from '../config/keys';

export default React.createContext({
    host: keys.API_ENDPOINT,
    // host: "http://localhost:8000/graphql",
});