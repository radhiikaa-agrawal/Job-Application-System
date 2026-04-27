import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { apiRequest } from '../services';

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.userDetail.jwtToken);

    const fetchAppliedJobs = async () => {
        try {
            const res = await apiRequest({
                url: '/applicant/getApplications',
                method: 'GET',
                token: token
            });
            if (Array.isArray(res)) {
                setAppliedJobs(res);
            }
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAppliedJobs();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-mine-shaft-950 flex flex-col">
            <Header />
            <div className="flex-grow p-8">
                <h1 className="text-3xl font-bold text-white mb-8">Jobs You've Applied For</h1>
                
                {loading ? (
                    <p className="text-mine-shaft-300">Loading your applications...</p>
                ) : appliedJobs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-mine-shaft-100 text-2xl mb-4">No applications found.</p>
                        <p className="text-mine-shaft-400">Start applying to jobs to see them here!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appliedJobs.map((app, index) => (
                            <div
                                key={index}
                                className="p-5 bg-mine-shaft-900 rounded-lg border border-mine-shaft-800 hover:border-cyan-500 transition-all shadow-lg"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-mine-shaft-800 rounded-md">
                                            <img
                                                className="h-10 w-10 object-contain"
                                                src={`/companies/${app.job.company}.png`}
                                                alt={app.job.company}
                                                onError={(e) => e.target.src = '/companies/Google.png'}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-white text-lg">{app.job.jobTitle}</h2>
                                            <p className="text-cyan-500 text-sm font-medium">{app.job.company}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-500 text-xs font-bold rounded-full uppercase">
                                        Applied
                                    </span>
                                </div>
                                
                                <div className="flex gap-2 text-xs mb-4">
                                    <span className="px-2 py-1 bg-mine-shaft-800 text-mine-shaft-200 rounded">{app.job.jobType}</span>
                                    <span className="px-2 py-1 bg-mine-shaft-800 text-mine-shaft-200 rounded">{app.job.location}</span>
                                </div>

                                <div className="border-t border-mine-shaft-800 pt-4 mt-2 flex justify-between items-center">
                                    <div className="text-xs text-mine-shaft-400">
                                        Applied with: <span className="text-mine-shaft-200">{app.email}</span>
                                    </div>
                                    <div className="text-cyan-500 font-bold">
                                        {app.job.salary}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AppliedJobs;
