const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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
    name: {type: GraphQLString},
    description: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Clients.findById(parent.clientId);
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

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    //adding  client ========================
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Clients({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },

    //adding project ...
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "projectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
            defaultValue: "Not Started",
          }),
        },
        clientId: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        const project = new Projects({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,

        });
        return project.save();
      },
    },

    //deleting client =========================

    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Clients.findByIdAndRemove(args.id);
      },
    },

    deleteProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLID},
      },
      resolve(parent,args){
        return Projects.findOneAndRemove(args.id);
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
