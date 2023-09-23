import React from 'react';
import { MdDeleteForever } from "react-icons/md";

const Order = ({item}) => {
    return (
        <div className="w-full h-auto bg-orange-600 border rounded-lg border-orange-50">
        <div className="flex flex-row items-center gap-1 p-5">
          <div className="flex flex-col items-center justify-center">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {item?.displayName || 'User'}
            </h5>
            <span className="text-sm text-gray-300 ">{item?.email}</span>
            <span className="text-sm text-gray-300 ">{item?.phoneNumber}</span>
          </div>
          <div className="flex space-x-3 lg:mt-6">
            <p
              className="inline-flex items-center px-4 py-2 text-xl font-medium text-center text-white bg-red-600 rounded-lg shadow-lg cursor-pointer hover:bg-red-700"
              title="Delete"
            >
              <MdDeleteForever />
            </p>
          </div>
        </div>
      </div>
      );
}

export default Order