import { Link } from 'react-router-dom'
import { UserProfile } from 'src/types/user.type'
import Popover from '../Popover'

interface Props {
  profile: UserProfile
}
export default function UserDropdownMenu({ profile }: Props) {
  const handleLogout = () => {}

  return (
    <Popover
      childrenClasses='self-start'
      renderPopover={
        <div className='flex min-w-[150px] flex-col items-start bg-[#3e365c] text-[20px] text-lg text-white shadow-md'>
          <Link className='w-full px-4 py-3 text-left transition-all hover:bg-[#5f518e]' to='#'>
            Profile
          </Link>
          <button className='w-full px-4 py-3 text-left transition-all hover:bg-[#5f518e]' onClick={handleLogout}>
            Logout
          </button>
        </div>
      }
    >
      <div className='flex cursor-pointer items-center text-white hover:text-gray-300'>
        <div className='h-12 w-12 flex-shrink-0'>
          {profile.images && profile.images.length > 0 ? (
            <img src={profile.images[0].url} alt='avatar' className='h-full w-full rounded-md object-cover' />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-md bg-purple-700 text-2xl font-medium'>
              {profile.display_name[0]}
            </div>
          )}
        </div>
        <div className='ml-2 max-w-[120px] truncate pr-10 text-lg font-medium'>{profile.display_name}</div>
      </div>
    </Popover>
  )
}
