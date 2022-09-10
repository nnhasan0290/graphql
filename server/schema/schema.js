const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const Projects = require("../model/project.js");
const Clients = require("../model/client.js");

const ClientType = new GraphQLObjectType({
  name: "client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
const ProjectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Clients.findByid(args.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Root",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Clients.findById(args.id);
      },
    },
    allClients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Clients.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Projects.findById(args.id);
      },
    },
    allProjects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Projects.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
