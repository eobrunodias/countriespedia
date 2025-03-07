import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
}

export default function SortButton({
  sortOrder,
  toggleSortOrder,
}: SortButtonProps) {
  return (
    <div className="flex items-center justify-start">
      <button onClick={toggleSortOrder}>
        {sortOrder === "desc" ? (
          <ArrowUpIcon className="size-9 text-gray-300 m-6" />
        ) : (
          <ArrowDownIcon className="size-9 text-gray-300 m-6" />
        )}
      </button>
    </div>
  );
}
