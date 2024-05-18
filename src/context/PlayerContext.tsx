/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Track } from 'src/types/playlist.type'

interface PlayerContextInterface {
  tracksQueue: Track[]
  currentTrack: Track | undefined
  pause: () => void
  play: () => void
  playNewTrack: (track: Track) => void
  audioRef: React.MutableRefObject<HTMLAudioElement> | undefined
  setTracksQueue: React.Dispatch<React.SetStateAction<Track[]>> | undefined
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | undefined>> | undefined
  playStatus: boolean
  time: {
    currentTime: number
    totalTime: number
  }
  setSeekTime: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  seekBarRef: React.MutableRefObject<null> | undefined
}

const initialState: PlayerContextInterface = {
  pause: () => {},
  play: () => {},
  playNewTrack: () => {},
  audioRef: undefined,
  tracksQueue: [],
  currentTrack: undefined,
  setTracksQueue: undefined,
  setCurrentTrack: undefined,
  playStatus: false,
  time: {
    currentTime: 0,
    totalTime: 0
  },
  setSeekTime: () => {},
  seekBarRef: undefined
}
export const PlayerContext = createContext<PlayerContextInterface>(initialState)

interface Props {
  children: React.ReactNode
}
export const PlayerContextProvider = ({ children }: Props) => {
  const audioRef = useRef(new Audio())
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(initialState.currentTrack)
  const [tracksQueue, setTracksQueue] = useState<Track[]>(initialState.tracksQueue)
  const [playStatus, setPlayStatus] = useState(false)
  const [time, setTime] = useState(initialState.time)
  const seekBarRef = useRef(null)

  const play = () => {
    setPlayStatus(true)
  }

  const pause = () => {
    setPlayStatus(false)
  }

  const playNewTrack = (track: Track) => {
    setCurrentTrack(track)
    setPlayStatus(true)
  }

  useEffect(() => {
    if (playStatus) {
      if (currentTrack?.preview_url) {
        audioRef.current.play()
      } else {
        toast.warn(`This track doesn't have preview version`, {
          autoClose: 1500,
          position: 'top-center'
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [playStatus, currentTrack?.preview_url])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        setTime({
          currentTime: isNaN(audioRef.current.currentTime) ? 0 : audioRef.current.currentTime,
          totalTime: isNaN(audioRef.current.duration) ? 0 : audioRef.current.duration
        })
      }
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [audioRef])

  useEffect(() => {
    if (audioRef.current.duration !== 0 && seekBarRef.current) {
      ;(seekBarRef.current as any).style.width = Math.floor((time.currentTime / time.totalTime) * 100) + '%'
    }
  }, [time])

  const setSeekTime = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement
    const width = target.clientWidth
    console.log(
      event.nativeEvent.offsetX,
      width,
      (Math.floor((event.nativeEvent.offsetX / Number(width)) * 100) / 100) * audioRef.current.duration
    )
    audioRef.current.currentTime =
      (Math.floor((event.nativeEvent.offsetX / Number(width)) * 100) / 100) * audioRef.current.duration
  }

  return (
    <PlayerContext.Provider
      value={{
        play,
        pause,
        playNewTrack,
        audioRef,
        tracksQueue,
        currentTrack,
        setTracksQueue,
        setCurrentTrack,
        playStatus,
        time,
        setSeekTime,
        seekBarRef
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
