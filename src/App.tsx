import React from 'react';
import { calculateJobs } from './utils/calculateCost';

const App: React.FC = () => {
    const jobs = calculateJobs();

    return (
        <div className="App">
            <h1>Job Costs</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.code}>
                            <td>{job.code}</td>
                            <td>{job.job}</td>
                            <td>{job.unit}</td>
                            <td>${job.totalCost.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
