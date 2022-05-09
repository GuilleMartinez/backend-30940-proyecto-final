module.exports = (req, res, next) => {
    const { admin } = require("../config/options");
    return admin ? next() : next({ type: "unauthorized" });
};
