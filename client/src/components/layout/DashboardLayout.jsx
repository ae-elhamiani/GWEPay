import React, { useState, useCallback } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Store, RefreshCcw, Zap, Menu, Bell, User, Search, ChevronDown, Sun, Moon, Plus } from 'lucide-react';
import Logo from '../common/Logo';
import LogoDark from '../common/Logo-d';

const CreativeDarkModeToggle = ({ isDarkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    className={`relative w-20 h-10 bg-white bg-opacity-20 rounded-full p-1 transition-colors duration-500 ease-in-out focus:outline-none ${
      isDarkMode ? 'bg-gray-800' : 'bg-purple-300'
    }`}
  >
    <div
      className={`absolute w-8 h-8 rounded-full shadow-md top-1 transform duration-500 ease-in-out ${
        isDarkMode ? 'translate-x-10 bg-gray-700' : 'translate-x-0 bg-white'
      }`}
    >
      {isDarkMode ? (
        <Moon className="h-6 w-6 text-purple-300 absolute top-1 left-1" />
      ) : (
        <Sun className="h-6 w-6 text-yellow-500 absolute top-1 left-1" />
      )}
    </div>
  </button>
);

const DashboardLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userType, setUserType] = useState('basic'); // 'basic' or 'premium'
  const location = useLocation();

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);
  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

  const sidebarItems = [
    { icon: Home, text: "Personal space", path: "/dashboard" },
    { icon: Store, text: "Stores space", path: "/dashboard/stores" },
    ...(userType === 'premium' ? [
      { icon: RefreshCcw, text: "P2P trade wallet", path: "/dashboard/p2p" },
      { icon: Zap, text: "Quick Actions", path: "/dashboard/actions" }
    ] : [])
  ];

  const handleUpgrade = useCallback(() => {
    // Implement upgrade logic here
    console.log('Upgrading to premium...');
    setUserType('premium');
  }, []);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}>
      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-64 shadow-lg p-4`}>
        <div className="flex items-center justify-between h-16 mb-8">
          {isDarkMode ? <LogoDark /> : <Logo />}
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu size={24} className={isDarkMode ? 'text-white' : 'text-purple-600'} />
          </button>
        </div>
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `flex items-center py-3 px-4 rounded-lg ${
                isActive
                  ? isDarkMode ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-600'
                  : isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              } transition-all duration-200`}
            >
              <item.icon className="mr-3" size={20} />
              <span className="font-medium">{item.text}</span>
              {item.text === "Stores space" && (
                <Plus className="ml-auto" size={18} />
              )}
            </NavLink>
          ))}
        </nav>
        {userType === 'basic' && (
          <button 
            onClick={handleUpgrade}
            className="mt-8 w-full relative overflow-hidden rounded-xl group shadow-lg"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-75 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
            <span className="relative w-full flex items-center justify-center bg-purple-600 bg-opacity-75 hover:bg-opacity-90 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform group-hover:scale-105">
              <span className="mr-2">✨</span>
              Upgrade premium
              <span className="ml-2">✨</span>
            </span>
            <div className="absolute inset-0 w-1/4 h-full bg-white opacity-20 transform -skew-x-12 animate-reflect"></div>
          </button>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-500 to-purple-600'} text-white p-4 lg:p-6`} style={{
          width: 'calc(92%)',
          height: '200px',
          margin: '20px 4%',
          background: isDarkMode 
            ? 'linear-gradient(89.92deg, rgba(76, 29, 149, 0.7) -1.43%, rgba(155, 16, 145, 0.315) 160.42%)'
            : 'linear-gradient(89.92deg, rgba(66, 34, 221, 0.7) -1.43%, rgba(243, 16, 145, 0.315) 160.42%)',
          borderRadius: '20px',
        }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="lg:hidden mr-4">
                <Menu size={24} />
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold">Your Dashboard</h2>
                <p className="text-sm lg:text-base opacity-80">Welcome back, User!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-2 px-4 pr-10 rounded-full bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white placeholder-white placeholder-opacity-75"
                />
                <Search className="absolute right-3 top-2.5 text-white opacity-75" size={20} />
              </div>
              <CreativeDarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <button className="relative p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              >
                <User size={20} />
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-sm lg:text-base opacity-80">Available balance</p>
            <p className="text-2xl lg:text-4xl font-bold mt-1">$2,234.00</p>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 mx-auto max-w-7xl w-full">
          <Outlet isDarkMode={isDarkMode}/>
        </main>

        {/* Footer */}
        <footer className={`${isDarkMode ? 'text-white' : 'text-gray-600'} py-4 px-6`}>
          <p className="text-center">&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;