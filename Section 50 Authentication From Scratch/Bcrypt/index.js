const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    // const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, 12)
    console.log(hash);
}
// bcrypt.genSalt(saltRounds, function (err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
//         // Store hash in your password DB.
//     });
// });

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('Logged you in!')
    } else {
        console.log('Incorrect password!')
    }
}

hashPassword('monkey');
login('monkey', '$2b$12$24Ec4NNCcRWPobWd9r.Tu.kScWzOtUo9lcV8DxOElW1jEW.OiJCwy')