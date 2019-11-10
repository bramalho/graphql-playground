const db = require('./db');

const Query = {
    greeting: () => 'It works',
    company: (root, {id}) => db.companies.get(id),
    job: (root, {id}) => db.jobs.get(id),
    jobs: () => db.jobs.list()
};

const Company = {
    jobs: (company) => db.jobs.list()
        .filter((job) => job.companyId === company.id)
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
}

const Mutation = {
    createJob: (root, {input}) => {
        const jobId = db.jobs.create(input);
        return db.jobs.get(jobId)
    }
}

module.exports = { Query, Mutation, Company, Job };
