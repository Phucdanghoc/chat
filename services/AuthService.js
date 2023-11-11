const bcrypt = require('bcrypt');
class AuthService{

    async hashPassword(plainPassword) {
        try {
            const hashedPassword = await bcrypt.hash(plainPassword, 10);
            return hashedPassword;
        } catch (error) {
            return error.message;
        }
    }
    
    async comparePasswords(inputPassword, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            return error.message;
        }
    }
    
}

module.exports = new AuthService();