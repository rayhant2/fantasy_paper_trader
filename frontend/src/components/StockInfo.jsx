import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function StockInfo({ isOpen, onClose, ticker }) {
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10"
            onClose={onClose}
        >
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                aria-hidden="true"
            />
            <div className="fixed inset-0 z-10 flex items-center justify-center p-15">
                <DialogPanel className="w-full max-w-4xl h-full rounded-2xl bg-white p-10 shadow-xl flex flex-col">
                    {/* Dialog Title */}
                    <DialogTitle className="font-semibold text-gray-900 mb-4">
                        <div className="flex flex-row justify-between w-full">
                            <div className="text-5xl">${ticker}</div>
                            <div className="text-right">
                                <div className="flex flex-row gap-20 justify-end text-[25px]">
                                    <div className="flex flex-row gap-4">
                                        <p>Bid:</p>
                                        <p className="font-light">$122</p>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <p>Ask:</p>
                                        <p className="font-light">$123</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogTitle>

                    <div className="flex flex-row items-center gap-2">
                        <p className="text-black text-2xl">($136.89)</p>
                        <p className="text-black">+20% past month</p>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-row gap-6">
                        {/* Left Column */}
                        <div className="flex-1 flex flex-col justify-between text-[17px]">
                            {/* HI, LO, OPEN, CLOSE */}
                            <div className="flex flex-row gap-10 justify-center items-center h-full">
                                {/* HI and LO */}
                                <div className="flex flex-col gap-2 flex-1 items-start">
                                    <div className="text-black p-4 rounded-lg flex items-center justify-center h-full">
                                        <div className="font-bold mr-3">
                                            HI:{" "}
                                        </div>
                                        <div className="text-[#228B22]">
                                            $230492
                                        </div>
                                    </div>
                                    <div className="text-black p-4 rounded-lg flex items-center justify-center h-full">
                                        <div className="font-bold mr-3">
                                            OPEN:{" "}
                                        </div>
                                        <div className="text-blue-700">
                                            $45334
                                        </div>
                                    </div>
                                </div>

                                {/* LO and CLOSE */}
                                <div className="flex flex-col gap-2 flex-1 items-start">
                                    <div className="text-black p-4 rounded-lg flex items-center justify-center h-full">
                                        <div className="font-bold mr-3">
                                            LO:{" "}
                                        </div>
                                        <div className="text-[#990000]">
                                            $230
                                        </div>
                                    </div>

                                    <div className="text-black p-4 rounded-lg flex items-center justify-center h-full">
                                        <div className="font-bold mr-3">
                                            CLOSE:{" "}
                                        </div>
                                        <div className="text-blue-900">
                                            $34509
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BUY and SELL as buttons */}
                            <div className="flex flex-row gap-6">
                                <button className="text-black text-xl font-semibold bg-green-200 p-4 rounded-lg text-center flex-1 h-full flex items-center justify-center">
                                    BUY
                                </button>
                                <button className="text-black text-xl font-semibold bg-red-200 p-4 rounded-lg text-center flex-1 h-full flex items-center justify-center">
                                    SELL
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Graph */}
                        <div className="flex-1 bg-yellow-100 rounded-xl p-4 flex items-center justify-center h-full">
                            <span className="text-gray-600 text-xl">
                                Graph Here
                            </span>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="mt-6">
                        <button
                            onClick={onClose}
                            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 w-full"
                        >
                            Close
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
