const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');






// RESOLVERS FOR QUERY AND MUTATION 
module.exports = {



    // MUTATION FOR CREATING USER 
    createUser: async args => {
        try {
            const existUser = await User.findOne({ email: args.userInput.email })
            // CHECK FOR IT THERE IS ALREADY A USER OR NOT 
            if (existUser) {
                // IT THERE IS ANY ERROR IT WILL SKIP ALL THEN BLOCK AND GO FOR CATCH BLOCK
                throw new Error("User exist alreaddy");
            }
            // USING BCRYPT JS FOR HASHING THE PASSWORD 
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            // RETURNING USER WILL ALL INFORMATIONS EXCEPT PASSWORD 
            return { ...result._doc, password: null, _id: result.id }
        } catch (err) {
            throw err;
        }
    },



    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User does not exist");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("Password incorrect");
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
}