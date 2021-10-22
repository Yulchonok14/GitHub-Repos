const queryRequest = (countPerPage, searchQuery, paginationKeyword, paginationString) => {
    return {
    query: `     
    {
        viewer {
          name
        }
        search(query: "${searchQuery} user:Yulchonok14 sort:updated-desc" type: REPOSITORY ${paginationKeyword}: ${countPerPage}, ${paginationString}){
            repositoryCount
            edges {
                cursor
                node {
                    ... on Repository {
                        id
                        url
                        name
                        createdAt
                        viewerSubscription
                    }
                }
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
          }
        }
    `
    }
};

  export default queryRequest;