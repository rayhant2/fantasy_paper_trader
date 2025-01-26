import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function StockInfo({ isOpen, onClose, ticker }) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={onClose}>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-23">
        <DialogPanel className="w-full max-w-4xl h-full max-h-xl rounded-2xl bg-white p-8 shadow-xl">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Stock Information
          </DialogTitle>
          <p className="mt-4 text-lg text-gray-700">
            Ticker Symbol: <span className="font-bold">{ticker}</span>
          </p>
          <div className="mt-6">
            <button
              onClick={onClose}
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
