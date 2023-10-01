import React from 'react';
import Card from './Card';
import {
  FaDollarSign,
  FaUtensils,
  FaRegCalendarAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
} from 'react-icons/fa';

const Stat = () => {
  // Mock data for restaurant statistics
  const stats = [
    { title: 'Total Orders', value: 150, icon: FaBoxOpen },
    { title: 'Pending Orders', value: 10, icon: FaRegCalendarAlt },
    { title: 'Completed Orders', value: 140, icon: FaRegCalendarAlt },
    { title: 'Total Revenue', value: 3500, icon: FaDollarSign }, // Value is in LKR
    { title: 'Average Order Value', value: 23.33, icon: FaDollarSign }, // Value is in LKR
    { title: 'Items Sold', value: 350, icon: FaUtensils },
    { title: 'Reservation Bookings', value: 50, icon: FaRegCalendarAlt },
    { title: 'Active Users', value: 200, icon: FaUsers },
    { title: 'Top Selling Items', value: 5, icon: FaShoppingCart },
    { title: 'Profit Margin', value: 25, icon: FaChartBar }, // Value is in percentage
  ];

  const formatCurrency = (value) => {
    // Format the value as currency in LKR
    return `LKR ${value.toLocaleString()}`;
  };

  return (
    // Dummy Stat data for the Admin Dashboard
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg rounded-lg px-6 py-4 hover:shadow-xl transition duration-300 ease-in-out ${
              stat.title === 'Total Revenue' || stat.title === 'Average Order Value'
                ? 'md:col-span-2'
                : stat.title === 'Profit Margin' || stat.title === 'Completed Orders'
                ? 'md:col-span-2'
                : 'col-span-1'
            }`}
          >
            <div className="flex items-center">
              <div className="mr-4 text-3xl text-primeGold">
                {React.createElement(stat.icon)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{stat.title}</h3>
                <p className="mt-2 text-3xl font-semibold">
                  {stat.title === 'Total Revenue' || stat.title === 'Average Order Value'
                    ? formatCurrency(stat.value)
                    : stat.title === 'Profit Margin'
                    ? `${stat.value}%`
                    : stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stat;
