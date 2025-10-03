import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetLatestRatesQuery } from "./api/exchangeApi";
import { setActivePage } from "./features/navigation/navigationSlice";

import Sidebar from "./components/Sidebar";
import PageHeader from "./components/PageHeader";
import StatsPage from "./pages/StatsPage";
import TransactionsPage from "./pages/TransactionsPage";
import TotalPage from "./pages/TotalPage";
import SettingsPage from "./pages/SettingsPage";

const API_KEY = import.meta.env.VITE_Exchange_API_KEY;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.navigation.activePage);

  const { error: apiError, isLoading: ratesLoading } =
    useGetLatestRatesQuery("USD");

  if (!API_KEY) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-50 text-red-800">
        <div className="text-center p-8 border-2 border-red-200 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Configuration Needed</h2>
          <p>Please add your API key to the `.env` file to start.</p>
        </div>
      </div>
    );
  }

  const handleSetActivePage = (page) => {
    dispatch(setActivePage(page));
  };

  const renderPageContent = () => {
    switch (activePage) {
      case "Stats":
        return <StatsPage />;
      case "Trans.":
        return <TransactionsPage />;
      case "Total":
        return <TotalPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <StatsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePage={activePage}
        setActivePage={handleSetActivePage}
      />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <PageHeader
            title={activePage.replace(".", "")}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
          {apiError && (
            <div className="bg-red-200 text-red-800 p-3 rounded-md mb-4">
              Error fetching currency data. Please check your API key or
              network.
            </div>
          )}
          {ratesLoading ? (
            <div className="text-center p-4">Loading currency data...</div>
          ) : (
            renderPageContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
