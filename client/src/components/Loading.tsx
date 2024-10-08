import { Spinner } from './ui/spinner';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent">
      <Spinner size="large" />
    </div>
  );
}