import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate, useParams } from 'react-router-dom';

const AccountPage = () => {

    const {user,isReady} = useContext(UserContext);
    const navigate = useNavigate();

    if(!isReady) {
        return(
            <><p>Loading...</p></>
        )
    }

    if(isReady && !user) {
        navigate("/login")
    }

    const {subpage} = useParams();

    const linkClasses = (type=null) => {
        let classes = 'py-2 px-6';
        if(type === "subpage") classes += ' bg-primary text-white rounded-full'
        return classes;
    }

  return (
    <div>
        <nav className='w-full flex justify-center mt-8 gap-2'>
            <Link className={linkClasses("subpage")} to={'/account'}>My profile</Link>
            <Link className={linkClasses()} to={'/account/bookings'}>My booking</Link>
            <Link className={linkClasses()} to={'/account/places'}>My accommodation</Link>
            <p>{subpage}</p>

        </nav>
    </div>
  )
}

export default AccountPage