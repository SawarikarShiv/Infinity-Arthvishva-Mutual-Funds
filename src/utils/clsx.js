/**
 * Utility for conditionally joining classNames together
 */
export function clsx(...args) {
  return args
    .flat()
    .filter(x => x != null && typeof x !== 'boolean')
    .join(' ');
}

export default clsx;