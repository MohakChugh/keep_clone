const bcrypt = require('bcrypt')

const encryptPassword = async (password) => {

    console.log('Inside encrypt password of authentication')

    try {
        let newPassword = await bcrypt.hash(password, 5).then((hash) => {
            console.log('before hash')
            console.log(hash)
            return hash
        })
        .catch((err) => {
            console.log(err)
            return err
        })

        return newPassword

    } catch (err) {
        console.log(err)
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        let result = await bcrypt.compare(password, hashedPassword).then((result) => {
            console.log(result)
            if(result===true) {
                let authenticated = true
                return authenticated
            } else {
                let authenticated = false
                return authenticated
            }
        })
        return result
    } catch (err) {
        return err
    }
}

exports.encryptPassword = encryptPassword
exports.comparePassword = comparePassword