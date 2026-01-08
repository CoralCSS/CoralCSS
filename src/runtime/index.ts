/**
 * CoralCSS Runtime
 *
 * Runtime utilities for CDN and browser usage.
 * @module runtime
 */

export { DOMObserver, createObserver } from './observer'
export type { ObserverConfig } from './observer'

export { StyleInjector, createInjector } from './injector'
export type { InjectorConfig } from './injector'

import { createCoralCDN as _createCoralCDN, getCoralCDN as _getCoralCDN } from './cdn'

export { createCoralCDN, getCoralCDN } from './cdn'
export type { CDNConfig, CoralCDN } from './cdn'

export default { createCoralCDN: _createCoralCDN, getCoralCDN: _getCoralCDN }
