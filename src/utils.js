const jwt = require('jsonwebtoken');

module.exports = {
    getUserId
}

function getUserId(ctx) {
    const Authorization = ctx.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, 'secret')
        return userId
    }

    throw new Error('Not authenticated')
}