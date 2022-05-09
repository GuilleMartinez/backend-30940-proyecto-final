module.exports = (error, req, res, next) => {
    const { type } = error;

    switch (type) {
        case "unauthorized":
            return res.status(401).json({
                error: -1,
                description: `${req.method} on ${req.originalUrl} not authorized 🔒`,
            });

        case "not_implemented":
            return res.status(501).json({
                error: -2,
                description: `${req.method} on ${req.originalUrl} not implemented ❌`,
            });

        case "not_found":
            return res
                .status(404)
                .json({ error: -10, description: `Resource not found 😪` });

        case "bad_request":
            return res.status(400).json({
                error: -20,
                description: `Error processing ${req.method} on ${req.originalUrl}. Please check JSON structure and its value types.`,
            });
    }
};
