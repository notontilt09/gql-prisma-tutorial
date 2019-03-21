const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client');

async function main() {
    // Create a new link
    // const newLink = await prisma.createLink({
    //     url: 'www.prisma.io',
    //     description: 'Primsa replaces traditional ORMs',
    // })
    // console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

    const allLinks = await prisma.links()
    // console.log(allLinks)
}

main().catch(e => console.error(e))

const resolvers = {
    // Query: {
    //     info: () => `This is the API of a Hackernews Clone`,
    //     feed: () => links,
    //     link: (parent, args) => links.find(link => link.id === `link-${args.id}`)
    // },
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, ctx, info) => {
            return ctx.prisma.links()
        },
        link: (root, args, ctx, info) => {
            return ctx.prisma.link({id: args.id})
        }
    },
    Mutation: {
        // post: (parent, args) => {
        //     const link = {
        //         id: `link-${idCount++}`,
        //         description: args.description,
        //         url: args.url
        //     }
        //     links.push(link)
        //     return link;
        // },
        post: (root, args, ctx) => {
            return ctx.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        deleteLink: async (root, args, ctx, info) => {
            // console.log(info);
            await ctx.prisma.deleteLink({id: args.id});
            return `link ${args.id} deleted`;
            // console.log(deleted);

            // return `you delete item ${args.id}`

            // return `Successfully deleted link ${args.id}`
        },
        updateLink: (root, args, ctx, info) => {
            const newLink = ctx.prisma.updateLink({
                where: {id: args.id},
                data: {
                    url: args.url,
                    description: args.description
                }
            })
            return newLink;
        }


        // deleteLink: (parent, args) => {
        //     links = links.filter(link => link.id !== `link-${args.id}`);
        //     return `You deleted link-${args.id}`;
        // },
        // updateLink: (parent, args) => {
        //     const link = links.find(link => link.id === `link-${args.id}`);
        //     if (args.url) {
        //         link.url = args.url
        //     }
        //     if (args.description) {
        //         link.description = args.description;
        //     }
        //     return link;
        // }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
})
server.start(() => console.log(`Server is running on http://localhost:4000`));