import React from "react";
import Sidebar from "../../components/sidebar";

function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <div class="p-4 sm:ml-64">
        <div class="p-4  border-gray-200 rounded-lg dark:border-gray-700">
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">asd</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
