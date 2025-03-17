const items = [
  {
    name: "Item 1",
  },
  {
    name: "Item 2",
  },
  {
    name: "Item 3",
  },
  {
    name: "Item 4",
  },
];

const StackClick = () => {
  return (
    <div className="full center">
      <div className="max-w-lg border w-full flex items-center gap-10">
        <div className="flex-1"></div>
        <div className="h-fit overflow-hidden flex flex-col gap-2 relative z-0">
          {items.map((item, idx) => {
            return (
              <div
                key={item.name + idx}
                className="flex items-start  gap-2 border"
              >
                <div className="size-4 bg-muted rounded-full center">
                  <div className="size-2.5 bg-background rounded-full"></div>
                </div>
                <p className="border h-fit text-sm flex items-end">
                  {item.name}
                </p>
              </div>
            );
          })}
          <div className="absolute h-full top-2 left-1.5 -z-10 w-1 bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default StackClick;
