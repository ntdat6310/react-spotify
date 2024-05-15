import { isAxiosError, AxiosError } from 'axios'

export function isUnauthorizedError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === 401
}

export function formatTotalTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000)

  const hours = Math.floor(totalSeconds / 3600)
  const remainingSecondsAfterHours = totalSeconds % 3600
  const minutes = Math.floor(remainingSecondsAfterHours / 60)

  // Tạo chuỗi định dạng thời gian
  let formattedTime = ''
  if (hours > 0) {
    formattedTime += `${hours} hr `
  }
  if (minutes > 0) {
    formattedTime += `${minutes} min`
  }
  // Nếu không có giờ hoặc phút, hiển thị giây
  if (hours === 0 && minutes === 0) {
    formattedTime = `${totalSeconds % 60} sec`
  }

  return formattedTime.trim()
}

export function millisecondsToMinutesAndSeconds(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000)

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`

  return formattedTime
}
