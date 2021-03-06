const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query.js');
const Mutation = require('./resolvers/Mutation.js');
const User = require('./resolvers/User.js');
const Link = require('./resolvers/Link.js');

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
    Query,
    Mutation,
    User,
    Link
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return { 
            ...request,
            prisma,
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`));