import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Vendors() {

  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);

  useEffect(() => {

    fetchVendors();

  }, []);

  const fetchVendors = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/vendors/all-vendors"
      );

      setVendors(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Explore Vendors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {vendors.map((vendor) => (

          <div
            key={vendor._id}

            onClick={() =>
              navigate(`/vendors/${vendor._id}`)
            }

            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >

            {/* Portfolio Image */}
            <img
              src={
                vendor.portfolioImages?.length > 0

                  ? `http://localhost:5000/uploads/${vendor.portfolioImages[0]}`

                  : "https://via.placeholder.com/400x300"
              }

              alt="vendor"

              className="w-full h-60 object-cover"
            />

            {/* Vendor Info */}
            <div className="p-5">

              <h2 className="text-2xl font-bold text-gray-800">
                {vendor.businessName}
              </h2>

              <p className="text-gray-500 mt-1">
                {vendor.category || "Category Not Added"}
              </p>

              <p className="text-gray-500">
                📍 {vendor.serviceArea || "Location Not Added"}
              </p>

              <p className="text-gray-500">
                💼 {vendor.experience || "Experience Not Added"}
              </p>

              <p className="text-blue-600 font-semibold mt-3">
                {vendor.priceRange || "Price Not Added"}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mt-4">

                {vendor.services?.slice(0, 3).map(
                  (service, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>

                  )
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Vendors;