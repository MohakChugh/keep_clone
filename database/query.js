const graphqlrequest = require('graphql-request');
const GraphQLClient = graphqlrequest.GraphQLClient;

const loginwithusername = async (username) => {
    const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'keepclone'
        },
    })
    const query = `query MyQuery {
        user(where: {username: {_eq: "${username}"}}) {
          email
          id
          password
          username
        }
      }`;
    var result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    return result;
};
const loginwithemail = async (email) => {
    const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'keepclone'
        },
    })
    const query = `query MyQuery {
        user(where: {email: {_eq: "${email}"}}) {
          email
          id
          password
          username
        }
      }`;
    var result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    return result;
};
const CheckUserFromDatabase = async (id) => {
    const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'keepclone'
        },
    })
    const query = `query MyQuery {
        user(where: {id: {_eq: "${id}"}}) {
          email
          id
          username
        }
      }`;
    var result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    return result;
};




  
exports.loginwithusername = loginwithusername
exports.loginwithemail = loginwithemail
exports.CheckUserFromDatabase = CheckUserFromDatabase