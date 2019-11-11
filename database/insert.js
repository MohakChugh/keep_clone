const graphqlrequest = require('graphql-request');
const GraphQLClient = graphqlrequest.GraphQLClient;

const addUser = async (email, password, username) => {
    const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'keepclone'
        },
    })
    const query = `mutation MyMutation {
        __typename
        insert_user(objects: {email: "${email}", password: "${password}", username: "${username}"}) {
          affected_rows
          returning {
            email
            id
            password
            username
          }
        }
      }
      `;
    var result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    return result;
};

const addUserNotes = async (userid, note) => {
  const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
      headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'keepclone'
      },
  })
  const query = `mutation MyMutation {
    __typename
    insert_notes(objects: {note: "${note}", userid: "${userid}"}) {
      affected_rows
    }
  }`;
  var result = await client.request(query)
      .then(data => {
          return data;
      })
      .catch((err) => { return err });
  return result;
};

const addUserShoppingList = async (userid, list) => {
  const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
      headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'keepclone'
      },
  })
  const query = `mutation MyMutation {
    __typename
    insert_shopping_list(objects: {list: "${list}", userid: "${userid}"}) {
      affected_rows
      returning {
        id
        list
        userid
      }
    }
  }`;
  var result = await client.request(query)
      .then(data => {
          return data;
      })
      .catch((err) => { return err });
  return result;
};

const addUserTasks = async (userid, tasks) => {
  const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
      headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'keepclone'
      },
  })
  const query = `mutation MyMutation {
    __typename
    insert_todo_list(objects: {tasks: "${tasks}", userid: "${userid}"}) {
      affected_rows
      returning {
        id
        tasks
        userid
      }
    }
  }
  `;
  var result = await client.request(query)
      .then(data => {
          return data;
      })
      .catch((err) => { return err });
  return result;
};

const deleteUserNotes = async (userid, id) => {
  const client = new GraphQLClient('https://keep-clone-database.herokuapp.com/v1/graphql', {
      headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'keepclone'
      },
  })
  const query = `mutation MyMutation {
    __typename
    delete_notes(where: {userid: {_eq: "${userid}"}, id: {_eq: "${id}"}}) {
      affected_rows
      returning {
        id
        note
        userid
      }
    }
  }
  `;
  var result = await client.request(query)
      .then(data => {
          return data;
      })
      .catch((err) => { return err });
  return result;
};

exports.addUser = addUser
exports.addUserNotes = addUserNotes
exports.addUserShoppingList = addUserShoppingList
exports.addUserTasks = addUserTasks
exports.deleteUserNotes = deleteUserNotes