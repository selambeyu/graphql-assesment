const { type } = require("express/lib/response");
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} = require("graphql");



// Student Type

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    class: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    student: {
      type: StudentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/students/" + args.id)
          .then((res) => res.data);
      },
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/students').then((res)=>res.data)
      },
    },
  },
});

// Mutuation

const mutuations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        class: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/students/", {
            name: args.name,
            class: args.class,
            
          })
          .then((res) => res.data);
      },
    },

    editStudent: {
      type: StudentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        class: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:3000/students/" + args.id, {
            name: args.name,
            class: args.class,
          })
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutuations,
});
