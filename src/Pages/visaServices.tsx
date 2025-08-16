import { useEffect, useState } from "react";
import { Card, Select, Input, Divider, Pagination, Progress } from "antd";
import visaData from "../data/visaServices.json";
import Banner from "./Banner";

const { Option } = Select;
const ITEMS_PER_PAGE = 8;

const VisaServices = () => {
  const [services, setServices] = useState(visaData);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = visaData;

      if (searchText !== "") {
        filtered = filtered.filter((service) =>
          service.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (filterType !== "All") {
        filtered = filtered.filter((service) => service.type === filterType);
      }

      setServices(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 500); // simulate network delay

    return () => clearTimeout(timer);
  }, [searchText, filterType]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = services.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <Banner title="Explore Our Visa Services" />

      {loading && (
        <Progress
          percent={50}
          status="active"
          showInfo={false}
          strokeColor={{ '0%': '#3b82f6', '100%': '#60a5fa' }}
          className="fixed top-0 left-0 w-full z-50"
        />
      )}

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Visa Services
        </h2>
        <Divider className="border-t-2 border-blue-500 w-20 mb-8" />

        <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
          <Input
            placeholder="Search visa services..."
            className="w-full md:w-1/2 rounded-lg shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            value={filterType}
            onChange={(value) => setFilterType(value)}
            className="w-full md:w-1/4 rounded-lg shadow-sm"
            size="large"
          >
            <Option value="All">All</Option>
            <Option value="Tourist">Tourist</Option>
            <Option value="Business">Business</Option>
            <Option value="Student">Student</Option>
          </Select>
        </div>

        {!loading && paginatedServices.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg font-medium">
            No visa services found for your search.
          </div>
        )}

        {!loading && paginatedServices.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {paginatedServices.map((service) => (
                <Card
                  key={service.id}
                  title={<span className="text-lg font-semibold">{service.name}</span>}
                  hoverable
                  className="shadow-lg rounded-xl transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {service.description}
                  </p>
                  <p className="font-medium text-blue-600 dark:text-blue-400">
                    Estimated Time: {service.processingTime}
                  </p>
                </Card>
              ))}
            </div>

            <Pagination
              current={currentPage}
              pageSize={ITEMS_PER_PAGE}
              total={services.length}
              onChange={(page) => setCurrentPage(page)}
              className="flex justify-center gap-4"
              showSizeChanger={false}
              showPrevNextJumpers={false}
              itemRender={(page, type, originalElement) => {
                if (type === "prev") {
                  return (
                    <button
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>
                  );
                }
                if (type === "next") {
                  return (
                    <button
                      disabled={currentPage === Math.ceil(services.length / ITEMS_PER_PAGE)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
                  );
                }
                return originalElement;
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VisaServices;
