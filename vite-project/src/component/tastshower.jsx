import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const TaskDisplay = () => {
  const nevigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [toggle, setToggle] = useState(false);
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/fetch`);
        const result = await response.json();
        setTask(result?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [toggle]);

  const handleDelte = async (id) => {
    try {
      console.log(id);
      if (id) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`);
        setToggle((prev) => !prev);
        toast.success("task deleted");
      }
    } catch (e) {
      console.log(e);
      toast.error("failed to delete");
    }
  };

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.task.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    const currentDate = new Date();

    const taskDate = new Date(task.date);

    switch (selectedFilter) {
      case "all":
        return true;

      case "today":
        return (
          taskDate.getDate() === currentDate.getDate() &&
          taskDate.getMonth() === currentDate.getMonth() &&
          taskDate.getFullYear() === currentDate.getFullYear()
        );

      case "yesterday":
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        return (
          taskDate.getDate() === yesterday.getDate() &&
          taskDate.getMonth() === yesterday.getMonth() &&
          taskDate.getFullYear() === yesterday.getFullYear()
        );

      case "thisWeek":
        const startOfWeek = new Date(currentDate);
        const dayOfWeek = currentDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        startOfWeek.setDate(currentDate.getDate() + diff);
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;

      default:
        return true;
    }
  });
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div className="w-28"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            ADMIN
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              nevigate("/login");
            }}
            className="w-28 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search tasks or names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 dark:text-white bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const refreshIcon = document.getElementById("refreshIcon");
                refreshIcon.classList.add("animate-spin");
                setToggle((prev) => !prev);
                setTimeout(() => {
                  refreshIcon.classList.remove("animate-spin");
                }, 1000);
              }}
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 flex items-center justify-center shadow-sm relative overflow-hidden"
              title="Refresh tasks"
            >
              <svg
                id="refreshIcon"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-1000"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              Filter:
            </span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-900 dark:text-white bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200"
            >
              <option value="all">All Tasks</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisWeek">This Week</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredTasks?.length} of {tasks?.length} tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks?.length > 0 &&
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="border-b border-gray-100 dark:border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                      {getInitials(task.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {task.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(task.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* <button className="p-1.5 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button> */}
                    <button
                      onClick={() => handleDelte(task._id)}
                      className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 dark:text-gray-300">
                    {task.task}
                  </p>
                  {task.createdAt && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Created:{" "}
                        {format(new Date(task.createdAt), "MMM dd, yyyy")}
                      </span>
                      {task.updatedAt && task.updatedAt !== task.createdAt && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Updated:{" "}
                          {format(new Date(task.updatedAt), "MMM dd, yyyy")}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        {filteredTasks?.length === 0 && (
          <div className="text-center p-10 bg-white/80 dark:bg-gray-800/80 rounded-2xl">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No tasks found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskDisplay;
