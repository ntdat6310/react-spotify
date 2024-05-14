import { HiOutlineHome, HiOutlineMenu, HiOutlineMenuAlt2, HiOutlineSearch } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'
import classNames from 'classnames'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Home() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const LibraryItems = ({ handleClick }: { handleClick?: () => void }) => (
    <>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <NavLink
            key={index}
            to='#'
            className='flex flex-row items-center justify-start gap-x-4 rounded-lg font-medium hover:bg-gray-800'
            onClick={() => handleClick && handleClick()}
          >
            <img
              src='https://i.scdn.co/image/ab67616d0000b27326cdcebc621b42d6ec3ef548'
              alt=''
              className='h-12 w-12 shrink-0 rounded-lg'
            />
            <div className='flex h-full grow flex-col justify-around'>
              <span className='line-clamp-1 capitalize text-white'> Thương về miền trung</span>
              <span className='line-clamp-1 text-xs'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit sequi tempore tempora atque
                laboriosam dicta, magnam repudiandae quia assumenda voluptatibus.
              </span>
            </div>
          </NavLink>
        ))}
    </>
  )
  return (
    <div className='relative flex h-[90vh] w-full bg-black-custom font-body'>
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
          <LibraryItems />
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
          <LibraryItems />
        </div>
      </nav>
    </div>
  )
}
