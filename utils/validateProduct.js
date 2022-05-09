module.exports = (body) => {
    const attributes = [
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "photo", type: "string" },
        { name: "code", type: "string" },
        { name: "stock", type: "number" },
        { name: "price", type: "number" },
    ];

    const keys = Object.keys(body);
    return attributes.every(
        (attr) => keys.includes(attr.name) && attr.type == typeof body[attr.name]
    );
};
