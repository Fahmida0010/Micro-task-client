const Loading = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm animate-pulse flex flex-col justify-between h-[280px]"
          >
            <div>
              {/* Title Skeleton */}
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4 mb-4"></div>

              {/* Detail Items Skeleton */}
              <div className="space-y-3 mb-5">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/5"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/5"></div>
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;