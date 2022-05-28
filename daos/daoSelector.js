const selectDatabase = () => {
  try {
    const { databases: { types, selected, collections } } = require("../config/options");
    const { config, type } = types[selected];

    console.log(`Data Access Object Selected: ${type}`);

    switch (selected) {
      case 1:
        return require("../utils/initializeFileSystem")(collections);

      case 2:
      case 3:
        return require("../utils/initializeSql")(config, collections);

      case 4:
        return require("../utils/initializeMongoDB")(config);

      case 5:
        return require("../utils/inititalizeFirestore")(config, collections);
    }
  } catch {
    console.log(
      "You have to choose a storage option between 1-5.\nThe server is shutting down."
    );
    process.exit(1);
  }
};

module.exports = selectDatabase();
