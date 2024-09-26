const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashGenerator = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}

exports.checkPassword = async (userHash, savedHash) => {
    return await bcrypt.compare(userHash, savedHash);
}
