import { useContext } from 'react'
import { PlayerContext } from 'src/context/PlayerContext'

export default function VolumnControl() {
  const { changeVolumn } = useContext(PlayerContext)
  return (
    <input
      type='range'
      min={0}
      max={100}
      className='w-[200px] cursor-pointer'
      onChange={(e) => {
        changeVolumn(Number(e.currentTarget.value) || 0)
      }}
    />
  )
}
