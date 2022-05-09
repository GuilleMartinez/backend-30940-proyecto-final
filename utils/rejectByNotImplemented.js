module.exports = (req, res, next) => {
    return next({ type: "not_implemented" });
}