import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'

const NavLinks = ({role}) => {
  const user=useSelector((state)=>state.userDetail);
  const applicantLinks=[
    { name: 'Home', url: "/", icon: <AiOutlineHome className="inline mr-1" /> },
    { name: 'Find Jobs', url: "/find-jobs" },
    { name: 'Job Applied', url: "/applied-jobs" },
    {name:'Saved Jobs', url:"/saved-jobs"},
    { name: 'About', url: "/about" }
  ]
  const employerLinks = [
    { name: 'Home', url: "/", icon: <AiOutlineHome className="inline mr-1" /> },
    { name: 'Post Jobs', url: "/post-jobs" },
    { name: 'About', url: "/about" }
  ]
    const navlinks=[
        {name:'Home',url:"#home"},
        {name:'About',url:"/about"},
        {name:'Services',url:"#services"},
        {name:'Contact us',url:"/contact"},
      
    ]
    let links = navlinks;
    if (role === 'APPLICANT') {
        links = applicantLinks;
    } else if (role === 'EMPLOYER') {
        links = employerLinks;
    }
    
  return (
    <div className="hidden md:flex space-x-8">
        {
            links.map((link,index)=>
            <div key={index}>
            <Link key={index} to={link.url} className='text-gray-300 hover:text-white font-semibold flex items-center'>
              {link.icon}
              {link.name}
            </Link>
            </div>
            )
            
        }
  </div>
  )
}

export default NavLinks
