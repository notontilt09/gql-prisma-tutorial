const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');

module.exports = {
    signup,
    login,
    post,
    deleteLink,
    updateLink
}

function post(root, args, ctx) {
    const userId = getUserId(ctx);
    return ctx.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })
}

async function deleteLink(root, args, ctx, info) {
    await ctx.prisma.deleteLink({id: args.id});
    return `link ${args.id} deleted`;
}

function updateLink(root, args, ctx, info) {
    const newLink = ctx.prisma.updateLink({
        where: {id: args.id},
        data: {
            url: args.url,
            description: args.description
        }
    })
    return newLink;
}

async function signup(root, args, ctx, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)
    // 2 
    const user = await ctx.prisma.createUser({ ...args, password })
    // 3 
    const token = jwt.sign({ userId: user.id }, 'secret')
    // 4
    return {
        token,
        user,
    }
}

async function login(root, args, ctx, info) {
    // 1 
    const user = await ctx.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid credentials')
    }
    const token = jwt.sign({ userId: user.id }, 'secret')
    // 3
    return {
        token, 
        user,
    }
}