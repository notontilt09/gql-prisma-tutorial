module.exports = {
    feed,
    info,
    link
}

function feed(root, args, ctx, info) {
    return ctx.prisma.links()
}

function info() {
    return `This is the API of a Hackernews Clone`
}

function link(root, args, ctx, info) {
    return ctx.prisma.link({ id: args.id })
}
