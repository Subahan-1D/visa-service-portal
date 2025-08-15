import { useEffect, useState } from "react";
import { Card, Select, Input } from "antd";
import visaData from "../data/visaServices.json";
import Banner from "./Banner";

const { Option } = Select;

const VisaServices = () => {
  const [services, setServices] = useState(visaData);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Apply search + filter
  useEffect(() => {
    let filtered = visaData;

    // Search
    if (searchText !== "") {
      filtered = filtered.filter((service) =>
        service.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== "All") {
      filtered = filtered.filter((service) => service.type === filterType);
    }

    setServices(filtered);
  }, [searchText, filterType]);

  return (
    <div>
      <Banner title="Explore Our Visa Services" />

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 mt-10">Visa Services</h2>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <Input
            placeholder="Search visa..."
            className="w-full md:w-1/2"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Select
            value={filterType}
            onChange={(value) => setFilterType(value)}
            className="w-full md:w-1/4"
          >
            <Option value="All">All</Option>
            <Option value="Tourist">Tourist</Option>
            <Option value="Business">Business</Option>
            <Option value="Student">Student</Option>
          </Select>
        </div>

        {/* List of Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.name}
              hoverable
              className="shadow"
            >
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="font-medium">
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
