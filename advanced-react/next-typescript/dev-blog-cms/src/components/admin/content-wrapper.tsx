import Link from 'next/link';
import { type PropsWithChildren, type FC } from 'react';

type Props = { title: string; seeAllRoutes: string };

const ContentWrapper: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  seeAllRoutes,
}) => {
  return (
    <div className="flex min-w-[300px] max-w-[500px] flex-col">
      <h3 className="py-2 text-2xl font-semibold text-primary-dark transition dark:text-primary">
        {title}
      </h3>

      <div className="flex flex-1 flex-col justify-between rounded border-2 border-secondary-dark p-3">
        <div className="custom-scrollbar max-h-[400px] space-y-5 overflow-y-scroll">
          {children}
        </div>

        <div className="mt-2 self-end text-right">
          <Link
            className="text-primary-dark transition hover:underline dark:text-primary"
            href={seeAllRoutes}
          >
            See all
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ContentWrapper };
