import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VendorDetails() {

  const { id } = useParams();

  const [vendor, setVendor] = useState(null);

  const [inquiryData, setInquiryData] = useState({
    customerName: "",
    customerPhone: "",
    requirement: "",
    budget: "",
  });

  useEffect(() => {

    fetchVendor();

  }, []);

  const fetchVendor = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/vendors/single-vendor/${id}`
      );

      setVendor(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setInquiryData({
      ...inquiryData,
      [e.target.name]: e.target.value,
    });

  };

  const handleInquiry = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/inquiries/create",
        {
          vendorId: id,
          ...inquiryData,
        }
      );

      alert("Inquiry Sent Successfully");

      setInquiryData({
        customerName: "",
        customerPhone: "",
        requirement: "",
        budget: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed To Send Inquiry");

    }

  };

  if (!vendor) {

    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Vendor Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            {vendor.businessName}
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            {vendor.category || "Category Not Added"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

            <div className="bg-gray-100 p-5 rounded-xl">

              <h3 className="text-gray-500">
                Experience
              </h3>

              <p className="text-xl font-bold mt-2">
                {vendor.experience || "Not Added"}
              </p>

            </div>

            <div className="bg-gray-100 p-5 rounded-xl">

              <h3 className="text-gray-500">
                Service Area
              </h3>

              <p className="text-xl font-bold mt-2">
                {vendor.serviceArea || "Not Added"}
              </p>

            </div>

            <div className="bg-gray-100 p-5 rounded-xl">

              <h3 className="text-gray-500">
                Starting Price
              </h3>

              <p className="text-xl font-bold mt-2 text-blue-600">
                {vendor.priceRange || "Not Added"}
              </p>

            </div>

          </div>

        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Services Offered
          </h2>

          <div className="flex flex-wrap gap-4">

            {
              vendor.services?.length > 0 ? (

                vendor.services.map((service, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full"
                  >
                    {service}
                  </span>

                ))

              ) : (

                <p>No Services Added</p>

              )
            }

          </div>

        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Portfolio Gallery
          </h2>

          {
            vendor.portfolioImages?.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {
                  vendor.portfolioImages.map((image, index) => (

                    <img
                      key={index}
                      src={`http://localhost:5000/uploads/${image}`}
                      alt="portfolio"
                      className="w-full h-72 object-cover rounded-xl"
                    />

                  ))
                }

              </div>

            ) : (

              <p>No Portfolio Images Uploaded</p>

            )
          }

        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6 text-blue-600">
            Send Inquiry
          </h2>

          <form
            onSubmit={handleInquiry}
            className="space-y-5"
          >

            <input
              type="text"
              name="customerName"
              placeholder="Your Name"
              value={inquiryData.customerName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="customerPhone"
              placeholder="Phone Number"
              value={inquiryData.customerPhone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              name="requirement"
              placeholder="Tell vendor your requirement..."
              value={inquiryData.requirement}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg h-32"
              required
            />

            <input
              type="text"
              name="budget"
              placeholder="Budget (Optional)"
              value={inquiryData.budget}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Inquiry
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default VendorDetails;