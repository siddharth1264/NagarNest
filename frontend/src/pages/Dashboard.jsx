import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const vendor = JSON.parse(
    localStorage.getItem("vendorInfo")
  );

  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {

    fetchInquiries();

  }, []);

  const fetchInquiries = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/inquiries/vendor/${vendor._id}`
      );

      setInquiries(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Unlock Lead
  const handleUnlockLead = async (leadId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/inquiries/unlock/${leadId}`
      );

      // Refresh Leads
      fetchInquiries();

    } catch (error) {

      console.log(error);

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");

    navigate("/login");

  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-blue-600">
            NagarNest
          </h1>

          <p className="text-gray-500 text-sm">
            Vendor Dashboard
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Main Content */}
      <div className="p-6">

        {/* Welcome */}
        <div className="mb-6">

          <h2 className="text-3xl font-bold">
            Welcome, {vendor?.ownerName} 👋
          </h2>

          <p className="text-gray-600 mt-1">
            Manage your business activity here.
          </p>

        </div>

        {/* Vendor Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-gray-500">
              Business Category
            </h3>

            <p className="text-2xl font-bold text-blue-600 mt-3">
              {vendor?.category || "Not Added"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-gray-500">
              Experience
            </h3>

            <p className="text-2xl font-bold text-green-600 mt-3">
              {vendor?.experience || "Not Added"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-gray-500">
              Service Area
            </h3>

            <p className="text-2xl font-bold text-purple-600 mt-3">
              {vendor?.serviceArea || "Not Added"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h3 className="text-gray-500">
              Starting Price
            </h3>

            <p className="text-2xl font-bold text-orange-500 mt-3">
              {vendor?.priceRange || "Not Added"}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">

            <h3 className="text-gray-500 mb-3">
              Services Offered
            </h3>

            <div className="flex flex-wrap gap-3">

              {vendor?.services?.length > 0 ? (

                vendor.services.map((service, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {service}
                  </span>

                ))

              ) : (

                <p className="text-gray-400">
                  No Services Added
                </p>

              )}

            </div>

          </div>

        </div>

        {/* Portfolio Gallery */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Portfolio Gallery
          </h2>

          {
            vendor?.portfolioImages?.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                {
                  vendor.portfolioImages.map((image, index) => (

                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-md"
                    >

                      <img
                        src={`http://localhost:5000/uploads/${image}`}
                        alt="portfolio"
                        className="w-full h-60 object-cover"
                      />

                    </div>

                  ))
                }

              </div>

            ) : (

              <p className="text-gray-500">
                No Portfolio Images Uploaded
              </p>

            )
          }

        </div>

        {/* Customer Leads */}
        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6 text-blue-600">
            Customer Leads
          </h2>

          {
            inquiries.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {
                  inquiries.map((lead) => (

                    <div
                      key={lead._id}
                      className="bg-white p-6 rounded-2xl shadow-md"
                    >

                      <h3 className="text-2xl font-bold text-gray-800">
                        {lead.customerName}
                      </h3>

                      <p className="text-gray-600 mt-3">
                        {lead.requirement}
                      </p>

                      <p className="text-blue-600 font-semibold mt-3">
                        Budget: {lead.budget || "Not Mentioned"}
                      </p>

                      {/* Locked Contact */}
                      <div className="mt-5">

                        {
                          lead.isUnlocked ? (

                            <div>

                              <p className="text-green-600 font-bold">
                                📞 {lead.customerPhone}
                              </p>

                            </div>

                          ) : (

                            <div>

                              <p className="text-red-500 font-semibold">
                                🔒 Contact Locked
                              </p>

                              <button

                                onClick={() => handleUnlockLead(lead._id)}

                                className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                              >
                                Unlock Lead
                              </button>

                            </div>

                          )
                        }

                      </div>

                    </div>

                  ))
                }

              </div>

            ) : (

              <p className="text-gray-500">
                No Leads Yet
              </p>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;