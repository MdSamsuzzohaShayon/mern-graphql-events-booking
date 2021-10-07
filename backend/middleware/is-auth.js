const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    // IN COMING REQUEST HEADER WITH TOKEN
    const authHeader = req.get("Authorization");
    // IF THERE IS NO AUTHORIZATION FIELD IN COMING REQUEST 
    if (!authHeader) {
        // THIS USER IS NOT ACCESS TO ANYTHING
        req.isAuth = false;
        return next();
    }


    console.log("Auth header-> ", authHeader);
    const token = authHeader.split(' ')[1]; // AUTHORIZATION: BEARER TOKEN_VALUE
    console.log("token -> ", token);
    // IF WE DON'T HAVE TOKEN OR TOKEN IS EMPTY STRING
    if (!token || token === '') {
        // THIS USER IS NOT ACCESS TO ANYTHING
        req.isAuth = false;
        return next();
    }

    // VERIFY TOKEN 
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretkey');

    } catch (err) {
        // THIS USER IS NOT ACCESS TO ANYTHING
        req.isAuth = false;
        return next();
    }


    // IF DECODED TOKEN IS NOT SET 
    if (!decodedToken) {
        // THIS USER IS NOT ACCESS TO ANYTHING
        req.isAuth = false;
        return next();
    }


    // IF EVERYTHING WENT RIGHT AND PASS ALL CONDITIONS 
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}