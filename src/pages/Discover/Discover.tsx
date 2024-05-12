import SongCard from 'src/components/SongCard'
import { genres } from 'src/assets/constants/constants'

export default function Discover() {
  return (
    <div className='flex flex-col text-gray-300'>
      <div className='w-full flex justify-between items-center flex-col sm:flex-row mt-4 mb-10'>
        <h2 className='font-bold text-3xl text-white text-left'>Discover</h2>
        <select
          className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none mt-5 sm:mt-0'
          onChange={() => {}}
          value=''
        >
          {genres.map((genre) => (
            <option key={genre.title} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap justify-between sm:justify-start gap-8'>
        {Array(10)
          .fill(0)
          .map((song, index) => (
            <SongCard key={index} />
          ))}
      </div>
    </div>
  )
}
