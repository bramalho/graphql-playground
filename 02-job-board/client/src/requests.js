import { getAccessToken, isLoggedIn } from './auth'

const SERVER_URL = 'http://localhost:9000/graphql';

async function graphqlRequest(query, variables = {}) {
    const request = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query, variables})
    };

    if (isLoggedIn()) {
        request.headers['authorization'] = 'Bearer ' + getAccessToken();
    }

    const response = await fetch(SERVER_URL, request);
    const responseBody = await response.json();

    if (responseBody.errors) {
        const messageError = responseBody.errors.map((error) => error.message).join('\n');
        throw new Error(messageError)
    }

    return responseBody.data;
}

export async function loadCompany(id) {
    const query = `query ComapnyQuery($id: ID!) {
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
    
    const {company} = await graphqlRequest(query, {id});
    return company;
}

export async function loadJobs() {
    const query = `{
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }`;
    
    const {jobs} = await graphqlRequest(query);
    return jobs;
}

export async function loadJob(id) {
    const query = `query JobQuery($id: ID!) {
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
    
    const {job} = await graphqlRequest(query, {id});
    return job;
}

export async function createJob(input) {
    const mutation = `mutation CreateJob($input: CreateJobInput) {
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

    const {job} = await graphqlRequest(mutation, {input});
    return job;
}
