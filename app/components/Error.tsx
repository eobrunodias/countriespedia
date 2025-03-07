import { XCircleIcon } from "@heroicons/react/24/outline";

interface ErrorProps {
  text: string;
}

export default function Error({ text }: ErrorProps) {
  return (
    <div className="flex flex-col items-center m-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <XCircleIcon className="size-9" />
        <span className="text-xl">Error</span>
      </div>
      <p className="text-xl">{text}</p>
    </div>
  );
}
