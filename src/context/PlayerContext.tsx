/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useMemo, useRef, useState } from 'react'
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
  addCurrentTrackToQueue: () => void
  removeCurrentTrackFromQueue: () => void
  isTrackQueueContainingCurrentTrack: boolean
  next: () => void
  previous: () => void
  isNextAvailable: boolean
  isPreviousAvailable: boolean
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
  changeVolumn: () => {},
  addCurrentTrackToQueue: () => {},
  removeCurrentTrackFromQueue: () => {},
  isTrackQueueContainingCurrentTrack: false,
  next: () => {},
  previous: () => {},
  isNextAvailable: false,
  isPreviousAvailable: false
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

  const isTrackQueueContainingCurrentTrack = useMemo(() => {
    return tracksQueue.some((track) => track.id === currentTrack?.id)
  }, [tracksQueue, currentTrack])

  const addCurrentTrackToQueue = () => {
    if (currentTrack) {
      const isTrackQueueContainingTrack = tracksQueue.some((item) => item.id === currentTrack.id)
      if (!isTrackQueueContainingTrack) {
        setTracksQueue((prev) => [...prev, currentTrack])
        toast.success('Track is added', {
          autoClose: 1000,
          position: 'top-center'
        })
      }
    }
  }

  const removeCurrentTrackFromQueue = () => {
    toast.success('Track is removed', {
      autoClose: 1000,
      position: 'top-center'
    })
    setTracksQueue((prev) => {
      return prev.filter((track) => track.id !== currentTrack?.id)
    })
  }

  const isNextAvailable = useMemo(() => {
    const index = tracksQueue.findIndex((item) => item.id === currentTrack?.id)
    return index < tracksQueue.length - 1
  }, [tracksQueue, currentTrack?.id])

  const isPreviousAvailable = useMemo(() => {
    const index = tracksQueue.findIndex((item) => item.id === currentTrack?.id)
    return index > 0
  }, [tracksQueue, currentTrack?.id])

  const next = () => {
    const index = tracksQueue.findIndex((item) => item.id === currentTrack?.id)
    setCurrentTrack(() => {
      if (index < tracksQueue.length - 1) {
        return tracksQueue[index + 1]
      } else {
        return tracksQueue[0]
      }
    })
  }

  const previous = () => {
    const index = tracksQueue.findIndex((item) => item.id === currentTrack?.id)
    if (index > 0) {
      setCurrentTrack(tracksQueue[index - 1])
    }
  }

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
    if (isNextAvailable) {
      next()
    } else if (tracksQueue.length > 0) {
      setCurrentTrack(tracksQueue[0])
      audioRef.current.play()
    } else {
      setPlayStatus(false)
    }
  }

  const toggleLoop = () => {
    setLoop((prev) => !prev)
  }

  console.log(tracksQueue)
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
        changeVolumn,
        addCurrentTrackToQueue,
        removeCurrentTrackFromQueue,
        isTrackQueueContainingCurrentTrack,
        next,
        previous,
        isNextAvailable,
        isPreviousAvailable
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
