module.exports = function (req, res, next) {
    // ekhne amra user object take access korte chasche r req er modhe kno user object ciloi na vai. eta authorize middleware a kaj korar somoy set kora hoise 
    //se admin middleware take amar authorize middleware er pore call korte hbe 
    if (req.user.role !== "admin") {
        return res.status(403).send("Forbidden !")
        // 403 status er mane holo forbidden ei link access er right nai tar 
    }
    next()
}