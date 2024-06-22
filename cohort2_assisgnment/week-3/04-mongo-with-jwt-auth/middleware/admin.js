// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    // here we will verify the token admin
    const token = req.header.authorization;// [bearer token]
    const token_ = token.split(" ");

    const decodedValue = jwt.verify(token_[1], jwt_secret);

    console.log(decodedValue);



    try {

        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        }
        else {
            res.status(401).json("you are not authorise to access");
        }

    } catch (error) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
    // here will get the original token key 



}

module.exports = adminMiddleware;