import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PlacesPage = () => {
  const { actionOrId } = useParams();
  console.log("actionOrId :: ", actionOrId);

  return (
    <div>
      {actionOrId !== 'new' && (
        <div className="text-center">
          <Link to="/account/places/new" className='inline-flex bg-primary text-white py-2 px-4 gap-2 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {
        actionOrId === 'new' && (
          <div>
            <form>
              <p className='text-2xl'>Title</p>
              <p className='text-gray-400 text-sm mb-1'>Title for your place. Should be short and catchy as in advertisement</p>
              <input type='text' placeholder='title, for example: My lovely aparment'/>
              <p className='text-2xl mt-4'>Address</p>
              <p className='text-gray-400 text-sm mb-1'>Address to your place</p>
              <input type='text' placeholder='address'/>
              <p className='text-2xl mt-4'>Photos</p>
              <p className='text-gray-400 text-sm mb-1'>More = Better</p>
              <input type='file' placeholder=''/>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default PlacesPage