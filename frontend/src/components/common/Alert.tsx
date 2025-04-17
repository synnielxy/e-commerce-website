import { AlertCircle, X } from "lucide-react";

interface AlertProps {
  message: string;
  availableStock?: number;
  onClose: () => void;
}

const Alert = ({ message, availableStock, onClose }: AlertProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Stock Alert</h3>
        </div>
        <div className="text-gray-600 mb-4">
          <p>{message}</p>
          {availableStock !== undefined && (
            <p className="mt-2">Available stock: {availableStock}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
