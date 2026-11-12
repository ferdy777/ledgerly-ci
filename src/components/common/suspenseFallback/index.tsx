import { type JSX, Suspense } from "react";

interface Props {
  children?: JSX.Element;
  path: string;
}

const SuspenseFallback = ({ children, path }: Props) => {
  return (
    /**
     * Key makes the fallback loader show up on new page load
     */
    <Suspense
      fallback={<div data-cy="page-loader" className="p-8 text-gray-400">Loading…</div>}
      key={path}
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
