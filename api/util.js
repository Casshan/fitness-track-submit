
const requireUser = (req, res, next) => {

    if(!req.user){
        res.status(401);
        res.send({ error: 'error', message: 'You must be logged in to perform this action', name: "error in index.js" });
    } 
    next();
}

module.exports = {requireUser};