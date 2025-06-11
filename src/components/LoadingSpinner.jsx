import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-5 rounded-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
        <p className="text-white mt-4">Cargando...</p>
      </div>
    </div>
  );
};

const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
        loading ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          </span>
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export { LoadingSpinner, LoadingButton };