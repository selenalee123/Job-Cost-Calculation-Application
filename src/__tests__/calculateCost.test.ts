import { calculateJobs, calculateJobCost } from '../utils/calculateCost';

interface JobData {
    jobId: number;
    jobDescription: string;
    jobUnit: string;
    jobType: string;
    itemId: number;
    itemDescription: string;
    itemUnit: string;
    jobItemQuantity: string;
    pricePerUnit: string;
}

// Mock job data
const mockData: JobData[] = [
    { jobId: 1, jobDescription: 'Excavation', jobUnit: 'sqm', jobType: 'INPUT', itemId: 1, itemDescription: 'Excavator', itemUnit: 'hour', jobItemQuantity: '2', pricePerUnit: '50' },
    { jobId: 1, jobDescription: 'Excavation', jobUnit: 'sqm', jobType: 'INPUT', itemId: 2, itemDescription: 'Labor', itemUnit: 'hour', jobItemQuantity: '5', pricePerUnit: '15' },
    { jobId: 2, jobDescription: 'Foundation', jobUnit: 'sqm', jobType: 'JOB', itemId: 1, itemDescription: 'Excavation', itemUnit: 'sqm', jobItemQuantity: '1.5', pricePerUnit: '' },
];
jest.mock('../data/jobs.json', () => [
    { jobId: 1, jobDescription: 'Excavation', jobUnit: 'sqm', jobType: 'INPUT', itemId: 1, itemDescription: 'Excavator', itemUnit: 'hour', jobItemQuantity: '2', pricePerUnit: '50' },
    { jobId: 1, jobDescription: 'Excavation', jobUnit: 'sqm', jobType: 'INPUT', itemId: 2, itemDescription: 'Labor', itemUnit: 'hour', jobItemQuantity: '5', pricePerUnit: '15' },
    { jobId: 2, jobDescription: 'Foundation', jobUnit: 'sqm', jobType: 'JOB', itemId: 1, itemDescription: 'Excavation', itemUnit: 'sqm', jobItemQuantity: '1.5', pricePerUnit: '' },
]);


describe('calculateJobCost', () => {
    it('calculates cost for a job with direct inputs', () => {
        const jobId = 1;
        const cost = calculateJobCost(jobId);

        const expectedCost = (2 * 50) + (5 * 15);
        expect(cost).toBeCloseTo(expectedCost, 2);
    });

    it('calculates cost for a job with nested jobs', () => {
        const jobId = 2;
        const cost = calculateJobCost(jobId);

        const expectedNestedCost = (2 * 50) + (5 * 15);
        const expectedCost = expectedNestedCost * 1.5;
        expect(cost).toBeCloseTo(expectedCost, 2);
    });
});

describe('calculateJobs', () => {
    it('returns a list of unique jobs with correct total costs', () => {
        const jobs = calculateJobs();

        const job1 = jobs.find(job => job.code === 1);
        const job2 = jobs.find(job => job.code === 2);

        const expectedJob1Cost = (2 * 50) + (5 * 15);
        const expectedJob2Cost = expectedJob1Cost * 1.5;

        expect(job1).toBeDefined();
        expect(job1!.totalCost).toBeCloseTo(expectedJob1Cost, 2);

        expect(job2).toBeDefined();
        expect(job2!.totalCost).toBeCloseTo(expectedJob2Cost, 2);
    });

    it('formats job data correctly', () => {
        const jobs = calculateJobs();

        jobs.forEach(job => {
            expect(job).toHaveProperty('code');
            expect(job).toHaveProperty('job');
            expect(job).toHaveProperty('unit');
            expect(job).toHaveProperty('totalCost');
            expect(typeof job.totalCost).toBe('number');
        });
    });
});
