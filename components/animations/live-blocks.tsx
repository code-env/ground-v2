const LiveBlogs = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <div className="h-full border w-[600px] bg-background rounded-xl p-4 flex flex-col">
        <div className="h-10 flex items-center gap-2">
          <div className="size-4 bg-red-500 rounded-full" />
          <div className="size-4 bg-yellow-500 rounded-full" />
          <div className="size-4 bg-green-500 rounded-full" />
        </div>
        <div className="flex-1 bg-red-50 rounded-lg"></div>
      </div>
    </div>
  );
};

export default LiveBlogs;
