// Next's image runtime requires a Next app. Only this framework boundary is stubbed.
import { createElement } from 'react';
export default function Image({ fill, preload, quality, ...props }) {
  return createElement('img', { ...props, style: fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...props.style } : props.style });
}
