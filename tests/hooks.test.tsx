import * as React from 'react'
import { render } from './utils'
import { reconciler, OGLContext, useOGL, useFrame, RootState, Subscription } from '../src'

describe('useOGL', () => {
  it('should return OGL state', async () => {
    let state: RootState

    const Test = () => {
      state = useOGL()
      return null
    }

    await reconciler.act(async () => {
      render(
        <OGLContext.Provider value={'test' as any}>
          <Test />
        </OGLContext.Provider>,
      )
    })

    expect(state).toBe('test')
  })

  it('should throw when used outside of context', async () => {
    let threw = false

    try {
      useOGL()
    } catch (_) {
      threw = true
    }

    expect(threw).toBe(true)
  })
})

describe('useFrame', () => {
  it('should subscribe an element to the frameloop', async () => {
    let state: RootState
    let time: number

    const subscribe = (callback: React.MutableRefObject<Subscription>) => {
      callback.current('test' as any, 1)
    }

    const Test = () => {
      useFrame((...args) => {
        state = args[0]
        time = args[1]
      })
      return null
    }

    await reconciler.act(async () => {
      render(
        <OGLContext.Provider value={{ subscribe } as any}>
          <Test />
        </OGLContext.Provider>,
      )
    })

    expect(state).toBeDefined()
    expect(time).toBeDefined()
  })

  it('should accept render priority', async () => {
    let priority = 0

    const subscribe = (_: React.MutableRefObject<Subscription>, renderPriority: number) => {
      if (renderPriority) priority += renderPriority
    }

    const Test = () => {
      useFrame(null, 1)
      return null
    }

    await reconciler.act(async () => {
      render(
        <OGLContext.Provider value={{ subscribe } as any}>
          <Test />
        </OGLContext.Provider>,
      )
    })

    expect(priority).not.toBe(0)
  })
})
