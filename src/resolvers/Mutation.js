const bcyrpt = require('bcyrptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    post,
    deleteLink,
    updateLink
}

function post(root, args, ctx) {
    return ctx.prisma.createLink({
        url: args.url,
        description: args.description
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
}