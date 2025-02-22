import * as React from 'react'
import { RootState, Subscription } from './types'

/**
 * Internal OGL context.
 */
export const OGLContext = React.createContext<RootState | null>(null)

/**
 * Accesses internal OGL state.
 */
export const useOGL = () => {
  const state = React.useContext(OGLContext)
  // We can only access context from within the scope of a context provider.
  // If used outside, we throw an error instead of returning null for DX.
  if (!state) throw 'Hooks must used inside a canvas or OGLContext provider!'
  return state
}

/**
 * Subscribe an element into a shared render loop.
 */
export const useFrame = (callback: Subscription, renderPriority = 0) => {
  const state = useOGL()
  // Store frame callback in a ref so we can pass a mutable reference.
  // This allows the callback to dynamically update without blocking
  // the render loop.
  const ref = React.useRef(callback)
  React.useLayoutEffect(() => void (ref.current = callback), [callback])
  // Subscribe on mount and unsubscribe on unmount
  React.useLayoutEffect(() => {
    state.subscribe(ref, renderPriority)
    return () => void state.unsubscribe(ref, renderPriority)
  }, [state, renderPriority])
}
