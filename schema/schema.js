const graphql = require('graphql')
var { GraphQLSchema,GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLList,GraphQLNonNull,GraphQLID } = require('graphql');


const Books = [
    {id:"1",name:"harry potter",genre:"fiction",authorId:1},
    {id:"2",name:"harry potter-2",genre:"fiction",authorId:2},
    {id:"3",name:"English",genre:"philosophy",authorId:3},
    {id:"4",name:"Grammer",genre:"philosophy",authorId:3},
    {id:"5",name:"story",genre:"philosophy",authorId:3}
    
    ]
    const Authors = [
        {id:"1",name:"JK Rowling",age:40},
        {id:"2",name:"JK Rowling",age:40},
        {id:"3",name:"charle Darwin",age:45}
        
        ]

const AuthorType = new GraphQLObjectType(
    {
        name:"AuthorType",
        description:"Author Detail",
        fields:()=>(
            {
                id :{type: GraphQLNonNull(GraphQLID)},
                name :{type: GraphQLNonNull(GraphQLString)},
                age :{type: GraphQLNonNull(GraphQLInt)},
                Books:{
                    type : new GraphQLList(BookType),
                    description:" Books Details",
                    resolve:(parent,args)=>Books.filter(Book=>Book.authorId==parent.id)
                     
                    
            }
        }
        )
    }
)

const BookType = new GraphQLObjectType(
    {
        name:"BookType",
        description:"Book Info",
        fields:()=>(
            {
              id : {type:GraphQLNonNull(GraphQLString)},
              name:{type:GraphQLNonNull(GraphQLString)},
              genre:{type:GraphQLNonNull(GraphQLString)},
              Author:{
                type:AuthorType,
                description:"AuthorDetails",
                resolve:(parent,args)=>(
                    Authors.find(Author=>Author.id==parent.authorId)
                )
              }
            }
        )
    }
)


const RootQuery = new GraphQLObjectType(
    {
        name:"RootQuery",
        description:"Root Query For Book",
        fields:()=>(
            {
                Books:{
                    description:"books details",
                    type: BookType,
                    args:{
                        id:{type:GraphQLID}
                    },
                    resolve:(parent,args)=>(
                        
                            Books.find(Book =>Book.id===args.id)
                        
                    )
                },

                Authors:{
                    description:"Authors Details",
                    type: AuthorType,
                    args:{
                        id:{type:GraphQLID}
                    },
                        resolve:(parent,args)=>(
                            Authors.find(Author =>Author.id==args.id)
                        )
                    
                },
                Book:{
                    description:"all book details",
                    type: new GraphQLList(BookType),
                    resolve(parent,args){
                        return Books
                    }
                    
                },
                Author:{
                    description:"All Author details",
                    type: new GraphQLList(AuthorType),
                    resolve(parent,args){
                        return Authors
                    }
                }

            }
        )

    }
) 


const Mutation = new GraphQLObjectType(
    {
        name:"Mutation",
        fields:()=>(
            {
                addAuthor:{
                    type:AuthorType,
                    args:{
                        id: {type: GraphQLID},
                        name:{type:new GraphQLNonNull(GraphQLString)},
                        age:{type:new GraphQLNonNull(GraphQLInt)}
                    },
                    resolve(parent,args)                        
                           {
                            let tmpAuthor = {
                                id : 1 + Authors.length,
                                name : args.name,
                                age : args.age

                            }
                            Authors.push(tmpAuthor);
                            return tmpAuthor
                           }
                },
                addBooks:{
                    type:BookType,
                    args:{
                        id:{type :GraphQLInt},
                        name:{type:new GraphQLNonNull(GraphQLString)},
                        genre:{type:new GraphQLNonNull(GraphQLString)},
                        authorId:{type:new GraphQLNonNull(GraphQLID)}
                    },
                    resolve(parent,args){
                        let tmpBooks ={
                            id : 1 + Books.length,
                            name: args.name,
                            genre : args.genre,
                            authorId:args.authorId

                        }
                        Books.push(tmpBooks);
                        return tmpBooks
                    }
                }
            }
        )
    }
)




module.exports = new GraphQLSchema(
    {
        query:RootQuery,
        mutation : Mutation
    }
)