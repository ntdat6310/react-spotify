import { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineHome, HiOutlineMenu, HiOutlineMenuAlt2, HiOutlineSearch } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'
import {
  useGetCurrentUserAlbumsQuery,
  useGetCurrentUserPlaylistsQuery,
  useGetCurrentUserProfileQuery
} from 'src/redux/apis/spotifyApi'
import Playlists from '../Playlists'
import Albums from '../Albums'

export default function Sidebar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: playlists } = useGetCurrentUserPlaylistsQuery()
  const { data: albums } = useGetCurrentUserAlbumsQuery()
  // const { data: profile } = useGetCurrentUserProfileQuery()
  return (
    <>
      <HiOutlineMenu
        className='absolute right-5 top-5 h-8 w-8 text-white lg:hidden'
        onClick={() => {
          setMobileMenuOpen(true)
        }}
      />
      <nav className='absolute top-0 hidden h-full flex-col gap-4 bg-black px-4 py-6 text-gray-300 transition-all  lg:left-0 lg:flex lg:w-[25%]'>
        <Link to='#' className='flex items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineHome className='h-6 w-6' />
          <span className='text-lg font-bold'>Home</span>
        </Link>
        <Link to='#' className='flex items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineSearch className='h-6 w-6' />
          <span className='text-lg font-bold'>Search</span>
        </Link>
        <div className='h-[1px] w-full bg-gray-500'></div>
        <div className='flex items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineMenuAlt2 className='h-6 w-6' />
          <span className='text-lg font-bold'>Your Library</span>
        </div>
        <div className='hide-scrollbar flex flex-col gap-4 overflow-y-auto'>
          <Playlists playlists={playlists} />
          <Albums albums={albums} />
        </div>
      </nav>
      {/* Mobile, Tablet sidebar*/}
      <nav
        className={classNames(
          'absolute top-0 z-50 flex h-screen w-[80%] flex-col gap-4 bg-black px-4 py-6 text-gray-300  transition-all lg:hidden',
          { 'left-0': isMobileMenuOpen },
          { '-left-full': !isMobileMenuOpen }
        )}
      >
        <RiCloseLine
          onClick={() => {
            setMobileMenuOpen(false)
          }}
          className='h-8 w-8 shrink-0 cursor-pointer self-end'
        />
        <Link to='#' className='flex items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineHome className='h-6 w-6' />
          <span className='text-lg font-bold'>Home</span>
        </Link>
        <Link to='#' className='flex items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineSearch className='h-6 w-6' />
          <span className='text-lg font-bold'>Search</span>
        </Link>
        <div className='h-[1px] w-full bg-gray-500'></div>
        <div className='flex  items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineMenuAlt2 className='h-6 w-6' />
          <span className='text-lg font-bold'>Your Library</span>
        </div>
        <div className='hide-scrollbar flex flex-col gap-4 overflow-y-auto'>
          <Playlists playlists={playlists} />
          <Albums albums={albums} />
        </div>
      </nav>
    </>
  )
}
