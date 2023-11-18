const Loading = () => {
  return (
    <div className="flex w-full flex-col space-y-2 self-start px-8 tablet:px-16">
      <div className="flex w-full items-end justify-between border-b-[1px]  border-b-gray-500 px-2">
        <p className="text-3xl font-medium">Guilds</p>
      </div>
      <div className="grid h-0 flex-1 animate-pulse grid-cols-[repeat(auto-fit_,_12rem)] grid-rows-[repeat(auto-fit_,_9rem)] items-start justify-center gap-3 overflow-auto p-2">
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
        <div className="flex h-36 w-48 flex-col items-start justify-between space-y-3 rounded-lg bg-gray-500 p-6">
          <div className="h-16 w-16 rounded-full bg-gray-400" />
          <div className="h-4 w-4/5 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export { Loading };
