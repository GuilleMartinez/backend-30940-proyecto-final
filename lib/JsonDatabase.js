const {
    promises: { access, readFile, writeFile },
    constants: { W_OK, R_OK },
} = require("fs");

class JsonDatabase {
    constructor(file) {
        this.path = `./db/${file}.json`;
        this.file = file;
        this.initialize();
    }

    async initialize() {
        try {
            await access(this.path, W_OK);
            await access(this.path, R_OK);
        } catch {
            await writeFile(this.path, "{}", "utf-8");
        }
    }

    async read() {
        const data = await readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async save(data) {
        const json = JSON.stringify(data, null, 2);
        return await writeFile(this.path, json, "utf-8");
    }

    async get() {
        return await this.read();
    }

    async insertOne() {
        return null;
    }

    async findOne() {
        return null;
    }

    async updateOne() {
        return null;
    }

    async removeOne() {
        return null;
    }
}

module.exports = JsonDatabase;
