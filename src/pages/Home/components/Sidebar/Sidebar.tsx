import classNames from 'classnames'
import { useMemo, useState } from 'react'
import { HiOutlineHome, HiOutlineMenu, HiOutlineMenuAlt2, HiOutlineSearch } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetCurrentUserAlbumsQuery, useGetCurrentUserPlaylistsQuery } from 'src/redux/apis/spotifyApi'
import { RootState } from 'src/redux/store'
import Albums from '../Albums'
import Playlists from '../Playlists'
import UserDropdownMenu from '../UserDropdownMenu'

export default function Sidebar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: playlists } = useGetCurrentUserPlaylistsQuery()
  const { data: currentUserAlbums } = useGetCurrentUserAlbumsQuery()
  const profile = useSelector((state: RootState) => state.profile.profile)

  const albums = useMemo(() => {
    if (currentUserAlbums) {
      return currentUserAlbums.items.map((item) => item.album)
    }
  }, [currentUserAlbums])

  return (
    <>
      <HiOutlineMenu
        className='absolute right-5 top-5 h-8 w-8 text-white lg:hidden'
        onClick={() => {
          setMobileMenuOpen(true)
        }}
      />
      <nav className='hidden h-full flex-shrink-0 flex-col gap-4 bg-black px-4 py-6 text-gray-300 transition-all lg:left-0 lg:flex lg:w-[30%] xl:w-[25%]'>
        {profile && <UserDropdownMenu profile={profile} />}
        <Link to='/' className='flex items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineHome className='h-6 w-6' />
          <span className='text-lg font-bold'>Home</span>
        </Link>
        <Link to='/search' className='flex items-center gap-x-4 transition-all hover:text-white'>
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
          'absolute top-0 z-50 flex h-full w-[80%] flex-col gap-4 bg-black px-4 py-6 text-gray-300  transition-all lg:hidden',
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
        {profile && <UserDropdownMenu profile={profile} />}
        <Link to='/' className='flex items-center gap-x-4 transition-all hover:text-white'>
          <HiOutlineHome className='h-6 w-6' />
          <span className='text-lg font-bold'>Home</span>
        </Link>
        <Link to='/search' className='flex items-center gap-x-4 transition-all hover:text-white'>
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
