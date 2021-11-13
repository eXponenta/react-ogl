// @ts-ignore
import * as OGL from 'ogl'

/**
 * OGL elements which must accept `gl` via constructor args.
 */
export const GL_ELEMENTS = [
  // Core
  OGL.Camera,
  OGL.Geometry,
  OGL.Mesh,
  OGL.Program,
  OGL.RenderTarget,
  OGL.Texture,

  // Extras
  OGL.Flowmap,
  OGL.GPGPU,
  OGL.NormalProgram,
  OGL.Polyline,
  OGL.Post,
  OGL.Shadow,
] as const

/**
 * React's internal props.
 */
export const RESERVED_PROPS = ['children', 'key', 'ref', '__self', '__source'] as const

/**
 * React rendering modes (defaults to blocking).
 */
export const RENDER_MODES = {
  legacy: 0,
  blocking: 1,
  concurrent: 2,
} as const
