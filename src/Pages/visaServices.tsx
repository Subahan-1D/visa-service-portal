import { useEffect, useState } from "react";
import { Card, Select, Input, Divider } from "antd";
import visaData from "../data/visaServices.json";
import Banner from "./Banner";

const { Option } = Select;

const VisaServices = () => {
  const [services, setServices] = useState(visaData);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
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
  }, [searchText, filterType]);

  return (
    <div>
      <Banner title="Explore Our Visa Services" />

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              title={<span className="text-lg font-semibold">{service.name}</span>}
              hoverable
              className="shadow-lg rounded-xl transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-3">{service.description}</p>
              <p className="font-medium text-blue-600 dark:text-blue-400">
                Estimated Time: {service.processingTime}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisaServices;
