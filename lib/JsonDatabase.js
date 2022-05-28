const { promises: { access, readFile, writeFile }, constants: { W_OK, R_OK } } = require("fs");
const Database = require("./Database");

class JsonDatabase extends Database {
    
  constructor(file) {
    super();
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
    } finally {
      console.log(`JSON File "${this.file}" ready to use ✔`);
    }
  }

  async read() {
    const data = await readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async save(data) {
    const json = JSON.stringify(data, null, 2);
    await writeFile(this.path, json, "utf-8");
    return true;
  }
  
}

module.exports = JsonDatabase;
