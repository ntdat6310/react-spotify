import {
  FloatingArrow,
  FloatingPortal,
  Placement,
  arrow,
  autoUpdate,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  placement?: Placement
  childrenClasses?: string
}

export default function Popover({ children, renderPopover, placement = 'bottom-start', childrenClasses = '' }: Props) {
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(10),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate
  })
  const hover = useHover(context, { handleClose: safePolygon() })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()} className={childrenClasses}>
        {children}
      </div>

      {isOpen && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className='z-50'>
            {renderPopover}
            <FloatingArrow ref={arrowRef} context={context} width={30} height={15} fill='#3e365c' />
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
