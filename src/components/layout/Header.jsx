import React from "react";
import { useFinance } from "../../context/FinanceContext";
import { Wallet, ShieldUser } from "lucide-react";
const Header = () => {
  const { role, setRole } = useFinance();
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight flex items-center">
          Finance Tracker
          <Wallet className="inline-block ml-2 text-purple-500" size={30} />
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">View as:</span>
          <ShieldUser className="inline-block text-gray-500" size={25} />
          <select
            className="border border-gray-300 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin" className="text-red-400">
              Admin
            </option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
