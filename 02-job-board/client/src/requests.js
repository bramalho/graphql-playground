import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import { getAccessToken, isLoggedIn } from './auth';

const SERVER_URL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
    if (isLoggedIn()) {
        operation.setContext({
            headers: {
                'authorization' : 'Bearer ' + getAccessToken()
            }
        });
    }

    return forward(operation);
});

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({uri: SERVER_URL})
    ]),
    cache: new InMemoryCache()
});

const jobQuery = gql`query JobQuery($id: ID!) {
    job(id: $id) {
        id
        title
        company {
            id
            name
        }
        description
    }
}`;

const jobsQuery = gql`query JobsQuery {
    jobs {
        id
        title
        company {
            id
            name
        }
    }
}`;

const createJobMutation = gql`mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
        id
        title
        company {
            id
            name
        }
        description
    }
}`;

const comapnyQuery = gql`query ComapnyQuery($id: ID!) {
    company(id: $id) {
        id
        name
        description
        jobs {
            id
            title
        }
    }
}`;

export async function loadCompany(id) {
    const {data: {company}} = await client.query({
        query: comapnyQuery,
        variables: {id}
    });

    return company;
}

export async function loadJobs() {
    const {data: {jobs}} = await client.query({
        query: jobsQuery
    });

    return jobs;
}

export async function loadJob(id) {
    const {data: {job}} = await client.query({
        query: jobQuery,
        variables: {id}
    });

    return job;
}

export async function createJob(input) {
    const {data: {job}} = await client.mutate({
        mutation: createJobMutation,
        variables: {input},
        update: (cache, {data}) => {
            cache.writeQuery({
                query: jobQuery,
                variables: {id: data.job.id},
                data
            })
        }
    });

    return job;
}
