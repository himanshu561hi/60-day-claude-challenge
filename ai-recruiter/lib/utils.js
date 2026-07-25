import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * lib/utils.js
 *
 * The cn() utility function is required by shadcn/ui components.
 * It merges Tailwind CSS class names intelligently:
 *
 * - clsx: Handles conditional classes (e.g., { 'bg-red-500': hasError })
 * - twMerge: Resolves Tailwind conflicts (e.g., 'p-2 p-4' becomes 'p-4')
 *
 * Usage:
 *   import { cn } from '@/lib/utils';
 *   <div className={cn('base-class', conditionalClass, props.className)} />
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
