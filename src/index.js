const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client');

async function main() {
    // Create a new link
    const newLink = await prisma.createLink({
        url: 'www.prisma.io',
        description: 'Primsa replaces traditional ORMs',
    })
    console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

    const allLinks = await prisma.links()
    console.log(allLinks)
}

main().catch(e => console.error(e))

// 1

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

// 2
let idCount = links.length;
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.find(link => link.id === `link-${args.id}`)
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link;
        },
        deleteLink: (parent, args) => {
            links = links.filter(link => link.id !== `link-${args.id}`);
            return `You deleted link-${args.id}`;
        },
        updateLink: (parent, args) => {
            const link = links.find(link => link.id === `link-${args.id}`);
            if (args.url) {
                link.url = args.url
            }
            if (args.description) {
                link.description = args.description;
            }
            return link;
        }

    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`));