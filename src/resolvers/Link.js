module.exports = {
    postedBy,
}

function postedBy(parent, args, ctx) {
    return ctx.prisma.link({ id: parent.id }).postedBy()
}