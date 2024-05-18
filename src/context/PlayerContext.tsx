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
  onAudioEnded: (event: React.SyntheticEvent<HTMLAudioElement, Event>) => void
  loop: boolean
  toggleLoop: () => void
  changeVolumn: (volumn: number) => void
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
  seekBarRef: undefined,
  onAudioEnded: () => {},
  loop: false,
  toggleLoop: () => {},
  changeVolumn: () => {}
}
export const PlayerContext = createContext<PlayerContextInterface>(initialState)

interface Props {
  children: React.ReactNode
}
export const PlayerContextProvider = ({ children }: Props) => {
  const audioRef = useRef(new Audio())
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(initialState.currentTrack)
  const [tracksQueue, setTracksQueue] = useState<Track[]>(initialState.tracksQueue)
  const [playStatus, setPlayStatus] = useState(initialState.playStatus)
  const [time, setTime] = useState(initialState.time)
  const [loop, setLoop] = useState(initialState.loop)
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

  // Handle seekbar
  useEffect(() => {
    if (audioRef.current.duration !== 0 && seekBarRef.current) {
      ;(seekBarRef.current as any).style.width = Math.floor((time.currentTime / time.totalTime) * 100) + '%'
    }
    if (audioRef.current.ended) {
      ;(seekBarRef.current as any).style.width = '0%'
    }
  }, [time])

  const setSeekTime = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    audioRef.current.currentTime =
      (Math.floor((event.nativeEvent.offsetX / Number(event.currentTarget.clientWidth)) * 100) / 100) *
      audioRef.current.duration
  }

  const onAudioEnded = (event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setPlayStatus(false)
  }

  const toggleLoop = () => {
    setLoop((prev) => !prev)
  }

  useEffect(() => {
    audioRef.current.loop = loop
  }, [loop])

  const changeVolumn = (volumn: number) => {
    audioRef.current.volume = volumn / 100
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
        seekBarRef,
        onAudioEnded,
        loop,
        toggleLoop,
        changeVolumn
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
