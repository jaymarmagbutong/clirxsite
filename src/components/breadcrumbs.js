// components/Breadcrumbs.js
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Split the path into segments and filter out empty segments
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" className="mb-4 mt-2">
      <ol className="flex items-center space-x-1 text-gray-700 text-sm">
        <li>
          <Link href="/dashboard" className="text-clirxColor hover:text-clirxLightColor">Dashboard /</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-1 text-gray-400">/</span>}
              {index === pathSegments.length - 1 ? (
                <span className="text-gray-500">{segment}</span>
              ) : (
                <Link href={href} className="text-clirxColor hover:text-clirxLightColor">
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
