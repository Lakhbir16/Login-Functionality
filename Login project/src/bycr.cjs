const bcrypt = require('bcrypt');

// const password = "Pig@11111111";
const password = "$2a$10$yFV6g/61amJ9NF.TDeyH8.ENLYEPDLhddBEKdNNr/0QBCzXZYEW/K";

const hash = "$2a$10$yFV6g/61amJ9NF.TDeyH8.ENLYEPDLhddBEKdNNr/0QBCzXZYEW/K";

bcrypt.compare(password, hash, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result); // true if the password matches the hash
    }
});
