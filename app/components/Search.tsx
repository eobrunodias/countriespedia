import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
  count: number;
}

export default function Search({ search, setSearch, count }: SearchProps) {
  return (
    <div className="w-full md:w-1/3">
      <div className="relative mb-2">
        <input
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 text-gray-300 bg-gray-600 focus:ring-blue-400 focus:outline-none border-gray-300"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Search by country name..."
        />
        <span className="absolute inset-y-0 right-4 flex items-center">
          <MagnifyingGlassIcon className="size-4" />
        </span>
      </div>
      <span className="text-gray-300 text-sm pl-4">
        Showing {count} {count === 1 ? "country" : "countries"}
      </span>
    </div>
  );
}
