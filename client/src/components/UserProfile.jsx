import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { apiRequest } from '../services'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toast'
import { AiOutlineMail, AiOutlineTags } from 'react-icons/ai'
import { FaBuilding, FaLocationDot } from 'react-icons/fa6';
import { FaCalendarAlt, FaCommentAlt } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { MdDescription } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const userId = parseInt(useSelector((state) => state.userDetail?.id), 10);
    const userName = useSelector((state) => state.userDetail?.name);
    const email = useSelector((state) => state.userDetail?.email);
    const gender = useSelector((state) => state.userDetail?.gender);
    const token = useSelector((state) => state.userDetail?.jwtToken);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        email: email || 'N/A',
        jobTitle: 'N/A',
        company: 'N/A',
        location: 'N/A',
        about: 'N/A',
        skills: [],
        experiences: [
            {
                title: 'N/A',
                company: 'N/A',
                location: 'N/A',
                startDate: 'N/A',
                endDate: 'N/A',
                description: 'N/A'
            }
        ]
    });
    const [hasProfile, setHasProfile] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        })
    }

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = [...profileData.experiences || []];
        updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
        setProfileData({
            ...profileData,
            experiences: updatedExperiences,
        });
    }

    const addExperienceField = () => {
        setProfileData({
            ...profileData,
            experiences: [
                ...(profileData.experiences || []),
                {
                    title: 'N/A',
                    company: 'N/A',
                    location: 'N/A',
                    startDate: 'N/A',
                    endDate: 'N/A',
                    description: 'N/A'
                }
            ]
        })
    }

    const addOrUpdateProfile = async (e) => {
        e.preventDefault();
        console.log('Sending request', profileData);
        try {
            const method = hasProfile ? "PUT" : "POST";
            const url = hasProfile ? `/profiles/updateProfile/${userId}` : `/profiles/addProfile/${userId}`;
            const res = await apiRequest({
                url,
                method,
                data: profileData,
                token,
            });
            // toast.success(hasProfile ? "Profile Updated Successfully" : "Profile Added Successfully");
            setProfileData(res);

            console.log('Profile operation successful', res);
            setIsEditing(false);
            setHasProfile(true);
            // Fetch the updated profile
            const updatedProfile = await apiRequest({
                url: `/profiles/${userId}`,
                method: "GET",
            });

            setProfileData(updatedProfile);
            console.log(updatedProfile);
            await fetchProfile();
        } catch (error) {
            toast.error("Error in profile operation");
            console.log(error);
        }
    }

    const fetchProfile = async () => {
        if (!userId) return;
        try {
            const res = await apiRequest({
                url: `/profiles/${userId}`,
                method: "GET",
            });

            // If no profile exists (id missing or error status), set default values
            if (!res || !res.id || res.status >= 400) {
                setProfileData({
                    name: userName || 'N/A',
                    email: email || 'N/A',
                    jobTitle: 'N/A',
                    company: 'N/A',
                    location: 'N/A',
                    about: 'N/A',
                    skills: [],
                    experiences: [
                        {
                            title: 'N/A',
                            company: 'N/A',
                            location: 'N/A',
                            startDate: '',
                            endDate: '',
                            description: 'N/A'
                        }
                    ]
                });
                setHasProfile(false);
            } else {
                const normalizedProfile = {
                    ...res,
                    skills: Array.isArray(res.skills) ? res.skills : [],
                    experiences: Array.isArray(res.experiences) ? res.experiences : []
                };
                setProfileData(normalizedProfile);
                setHasProfile(true);
            }
        } catch (error) {
            console.log("Error fetching profile", error);
            setProfileData({
                name: userName || 'N/A',
                email: email || 'N/A',
                jobTitle: 'N/A',
                company: 'N/A',
                location: 'N/A',
                about: 'N/A',
                skills: [],
                experiences: [
                    {
                        title: 'N/A',
                        company: 'N/A',
                        location: 'N/A',
                        startDate: '',
                        endDate: '',
                        description: 'N/A'
                    }
                ]
            });
            setHasProfile(false);
        }
    };

    useEffect(() => {
        if (userId && !isNaN(userId)) {
            fetchProfile();
        }
    }, [userId]);

    useEffect(() => {
        if (userName && (profileData.name === 'N/A' || !profileData.name)) {
            setProfileData(prev => ({ ...prev, name: userName }));
        }
        if (email && (profileData.email === 'N/A' || !profileData.email)) {
            setProfileData(prev => ({ ...prev, email: email }));
        }
    }, [userName, email, profileData.name, profileData.email]);

    return (
        <>
            <ToastContainer />
            <Header />
            <div className="min-h-screen bg-mine-shaft-800 text-white p-8 mx-auto flex flex-col gap-6">
                {profileData ? (
                    isEditing ? (
                        <form onSubmit={addOrUpdateProfile} className="max-w-4xl mx-auto w-full space-y-6">
                            <button type="button" onClick={() => setIsEditing(false)} className="text-lg self-start mb-2 bg-none border border-cyan-/-aqua-500 hover:bg-cyan-/-aqua-500 text-mine-shaft-100 rounded-md px-6 py-2 hover:text-mine-shaft-900 ">Back</button>

                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Email</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <AiOutlineMail className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div >
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Job Title</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <AiOutlineTags className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={profileData.jobTitle}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Company</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <FaBuilding className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="company"
                                        value={profileData.company}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Location</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <FaLocationDot className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={profileData.location}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>About</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <FaCommentAlt className="text-cyan-500 p-1" size={30} />
                                    <textarea
                                        name="about"
                                        value={profileData.about}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Skills</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <GiSkills className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="skills"
                                        value={Array.isArray(profileData.skills) ? profileData.skills.join(',') : ''}
                                        onChange={(e) => {
                                            setProfileData({ ...profileData, skills: e.target.value.split(',').map(s => s.trim()) })
                                        }}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <h3 className="text-xl font-semibold mt-2 ">Experiences</h3>
                               
                                {profileData.experiences?.map((exp, index) => (
                                    <div key={index} className="mt-2 border border-cyan-/-aqua-500 rounded-lg p-4 space-y-4">
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <AiOutlineTags className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="text"
                                                name="title"
                                                value={exp.title}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Title"
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaBuilding className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="text"
                                                name="company"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Company"
                                                className="w-full  bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaLocationDot className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="text"
                                                name="location"
                                                value={exp.location}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Location"
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaCalendarAlt className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={exp.startDate}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                className="w-full  bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaCalendarAlt className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={exp.endDate}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <MdDescription className="text-cyan-500 p-1" size={30} />
                                            <textarea
                                                name="description"
                                                value={exp.description}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Description"
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={addExperienceField}
                                            className="font-semibolc bg-cyan-/-aqua-500 hover:bg-cyan-/-aqua-600 text-mine-shaft-900 font-semibold py-2 px-4 rounded-md"
                                        >
                                            Add More Experiences
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="bg-cyan-/-aqua-500 hover:bg-cyan-/-aqua-700 text-black font-medium py-2 px-4 rounded text-sm mt-4"
                                >
                                {hasProfile ? 'Update Profile' : 'Save Profile'}
                            </button>
                        </form>
                    ) : (
                        <div className="max-w-5xl mx-auto w-full">
                            <div className="relative mb-20">
                                <div className="h-48 w-full bg-gradient-to-r from-mine-shaft-900 via-cyan-950 to-mine-shaft-900 rounded-xl border border-mine-shaft-700 shadow-xl overflow-hidden relative">
                                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                                    <div className="absolute top-4 right-4">
                                        <button className="bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-full transition-all border border-white/10 group">
                                            <AiOutlineTags className="text-white opacity-60 group-hover:opacity-100" />
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute -bottom-14 left-10">
                                    <div className="relative">
                                        <img 
                                            src={gender === 'girl' ? '/Avatars/Avatar2.jpg' : '/Avatars/Avatar1.jpg'} 
                                            alt="Profile" 
                                            className="w-44 h-44 rounded-full border-[6px] border-mine-shaft-800 shadow-2xl object-cover bg-mine-shaft-900"
                                            onError={(e) => {
                                                e.target.src = 'https://ui-avatars.com/api/?name=' + (userName || 'User') + '&background=00bcd4&color=fff&size=200';
                                            }}
                                        />
                                        <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-500 border-4 border-mine-shaft-800 rounded-full shadow-lg"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-start px-4">
                                <div className="space-y-1">
                                    <h1 className="text-4xl font-bold text-white tracking-tight">{userName || 'N/A'}</h1>
                                    <p className="text-2xl text-mine-shaft-200 font-medium">{profileData?.jobTitle !== 'N/A' ? profileData.jobTitle : 'Professional'}</p>
                                    <div className="text-lg text-mine-shaft-300 flex items-center gap-2 pt-2"> 
                                        {profileData?.company !== 'N/A' && (
                                            <span className='font-bold text-cyan-/-aqua-500'>
                                                {profileData.company}
                                            </span>
                                        )}
                                        {profileData?.company !== 'N/A' && profileData?.location !== 'N/A' && <span className="text-mine-shaft-500">|</span>}
                                        {profileData?.location !== 'N/A' && <span>{profileData.location}</span>}
                                    </div>
                                    
                                    <p className="text-lg text-cyan-/-aqua-500 cursor-pointer hover:underline pt-1">
                                        {profileData?.email || 'N/A'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-cyan-/-aqua-500 hover:bg-cyan-/-aqua-400 text-mine-shaft-950 font-bold py-2.5 px-8 rounded-lg transition-all shadow-lg hover:scale-105 active:scale-95"
                                >
                                    Edit Profile
                                </button>
                            </div>

                            <div className="mt-12 px-4 space-y-12">
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 border-b border-mine-shaft-700 pb-2 flex items-center gap-2">
                                        <FaCommentAlt className="text-cyan-500 text-xl" /> About
                                    </h2>
                                    <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
                                        {profileData?.about !== 'N/A' ? profileData.about : 'No information provided yet. Click edit to add a professional summary about yourself!'}
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4 border-b border-mine-shaft-700 pb-2 flex items-center gap-2">
                                        <GiSkills className="text-cyan-500 text-xl" /> Skills
                                    </h2>
                                    <div className='flex flex-wrap gap-3'>
                                        {profileData?.skills?.filter(skill => skill !== 'N/A' && skill !== '').length > 0 ? (
                                            profileData.skills
                                                .filter(skill => skill !== 'N/A' && skill !== '')
                                                .map((skill, index) => (
                                                <div 
                                                    key={index} 
                                                    className="bg-mine-shaft-900/50 px-4 py-2 rounded-lg text-cyan-/-aqua-500 border border-cyan-500/20 text-sm font-semibold hover:border-cyan-500 transition-colors"
                                                >
                                                    {skill}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-mine-shaft-400 italic">No skills added yet.</p>
                                        )}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-6 border-b border-mine-shaft-700 pb-2 flex items-center gap-2">
                                        <FaBuilding className="text-cyan-500 text-xl" /> Experience
                                    </h2>
                                    {profileData?.experiences?.filter(exp => exp.title !== 'N/A' && exp.company !== 'N/A').length > 0 ? (
                                        <div className="space-y-8">
                                            {profileData.experiences
                                                .filter(exp => exp.title !== 'N/A' && exp.company !== 'N/A')
                                                .map((exp, index) => (
                                                <div key={index} className="flex items-start gap-6 group">
                                                    <div className='w-16 h-16 bg-mine-shaft-900 rounded-xl flex items-center justify-center overflow-hidden border border-mine-shaft-700 group-hover:border-cyan-500 transition-colors shadow-lg'>
                                                        <img 
                                                            src={`/companies/${exp.company}.png`} 
                                                            alt={exp.company} 
                                                            className="w-full h-full object-contain p-2"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="hidden w-full h-full items-center justify-center bg-cyan-500/10 text-cyan-500 font-bold text-2xl uppercase">
                                                            {exp.company?.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className='flex-1 border-l-2 border-mine-shaft-700 pl-6 group-last:border-transparent'>
                                                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                            {exp.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-xl text-mine-shaft-200 mt-1">
                                                            <span className="font-semibold text-mine-shaft-100">{exp.company}</span> 
                                                            <span className="text-mine-shaft-500">•</span>
                                                            <span className="flex items-center gap-1 text-lg">
                                                                <FaLocationDot className="text-sm opacity-50" /> {exp.location}
                                                            </span>
                                                        </div>
                                                        <p className="text-md text-mine-shaft-400 mt-1 flex items-center gap-2">
                                                            <FaCalendarAlt className="text-sm" /> {exp.startDate} - {exp.endDate || 'Present'}
                                                        </p>
                                                        <p className="mt-4 text-lg text-mine-shaft-300 leading-relaxed">
                                                            {exp.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-12 border-2 border-dashed border-mine-shaft-700 rounded-2xl text-center bg-mine-shaft-900/20">
                                            <p className="text-mine-shaft-300 text-xl font-medium">No professional experiences added yet.</p>
                                            <p className="text-mine-shaft-500 mt-2">Your work history helps employers find you!</p>
                                        </div>
                                    )}
                                </section>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="flex-grow flex items-center justify-center">
                        <div className="animate-pulse text-cyan-500 text-2xl font-bold">Loading profile...</div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default UserProfile