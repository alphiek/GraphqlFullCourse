const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt,
    GraphQLSchema,
    GraphQLID 
} = graphql;


// dummy data

var books = [
    { name: 'booky mcBook', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'book of doom', genre: 'Romance', id: '2', authorId: '2' },
    { name: 'book face magic', genre: 'Fantasy', id: '3', authorId: '3' },
];

var authors = [
    { name: 'someone chops', age: 42, id: '1' },
    { name: 'facey face', age: 62, id: '2' },
    { name: 'young juan', age: 5, id: '3' },
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args){
              return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});