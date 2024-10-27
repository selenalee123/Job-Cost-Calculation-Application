import data from '../data/jobs.json';


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

interface Job {
    code: number;
    job: string;
    unit: string;
    totalCost: number;
}

const jobData: JobData[] = data;

function calculateInputCost(item: JobData): number {
    // Convert quantities to numbers and handle empty prices as 0
    const quantity = parseFloat(item.jobItemQuantity);
    const unitCost = parseFloat(item.pricePerUnit) || 0;
    return quantity * unitCost;
}

export function calculateJobCost(jobId: number, calculatedJobs: Map<number, number> = new Map()): number {
    if (calculatedJobs.has(jobId)) {
        return calculatedJobs.get(jobId)!;
    }

    const jobItems = jobData?.filter(item => item.jobId === jobId);
    let totalCost = 0;

    jobItems.forEach(item => {
        if (item.jobType === 'INPUT') {
            //  if job type is input 
            totalCost += calculateInputCost(item);
        } else if (item.jobType === 'JOB') {
            // Nested job: calculate its cost recursively
            const nestedCost = calculateJobCost(item.itemId, calculatedJobs);
            totalCost += nestedCost * parseFloat(item.jobItemQuantity);
        }
    });

    calculatedJobs.set(jobId, totalCost);
    return totalCost;
}

export function calculateJobs(): Job[] {
    const uniqueJobs = Array.from(new Set(jobData.map(item => item.jobId)));
    return uniqueJobs.map(jobId => {
        const job = jobData.find(item => item.jobId === jobId)!;
        return {
            code: jobId,
            job: job.jobDescription,
            unit: job.jobUnit,
            totalCost: calculateJobCost(jobId)
        };
    });
}
