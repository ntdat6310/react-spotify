import Sidebar from 'src/pages/Home/components/Sidebar'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='relative flex h-[90vh] w-full bg-black-custom font-body'>
      <Sidebar />
      <div className='hide-scrollbar mt-20 grow overflow-y-auto px-2'>{children}</div>
    </div>
  )
}
