function StockPreview({ dataSet }) {
    return (
        <ul role="list" className="overflow-auto flex flex-col gap-6 h-[90%]">
            {dataSet.map((data, index) => (
                <li
                    key={index} //person.email
                    className="shadow-lg rounded-xl bg-white flex justify-between gap-x-6 p-5 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex min-w-0 gap-x-4">
                        <img
                            alt=""
                            src={data.imageUrl}
                            className="size-12 flex-none rounded-full bg-gray-50"
                        />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900">
                                {data.name}
                            </p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                                {data.email}
                            </p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm/6 text-gray-900">{data.role}</p>
                        {data.lastSeen ? (
                            <p className="mt-1 text-xs/5 text-gray-500">
                                Last seen{" "}
                                <time dateTime={data.lastSeenDateTime}>
                                    {data.lastSeen}
                                </time>
                            </p>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="size-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs/5 text-gray-500">
                                    Online
                                </p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default StockPreview;
