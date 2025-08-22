
import type { SVGProps } from 'react';

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10z" />
      <path d="M12 2a7 7 0 0 1 7 7h2a10 10 0 0 0-10-9z" />
      <path d="M22 12a10 10 0 0 0-9-10" />
      <path d="M2 12a10 10 0 0 0 10 10" />
    </svg>
  );
}
