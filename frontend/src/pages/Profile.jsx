import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    category: "",
    experience: "",
    serviceArea: "",
    priceRange: "",
    services: [],
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {

    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });

  };

  const handleImageChange = (e) => {

    setImages([...e.target.files]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const vendorInfo = JSON.parse(
        localStorage.getItem("vendorInfo")
      );

      // Create FormData
      const formData = new FormData();

      formData.append(
        "category",
        profileData.category
      );

      formData.append(
        "experience",
        profileData.experience
      );

      formData.append(
        "serviceArea",
        profileData.serviceArea
      );

      formData.append(
        "priceRange",
        profileData.priceRange
      );

      // Services Array
      profileData.services.forEach((service) => {

        formData.append(
          "services",
          service
        );

      });

      // Multiple Images
      images.forEach((image) => {

        formData.append(
          "portfolioImages",
          image
        );

      });

      const response = await axios.put(

        `http://localhost:5000/api/vendors/update-profile/${vendorInfo._id}`,

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }

      );

      console.log(response.data);

      // Update Local Storage
      localStorage.setItem(
        "vendorInfo",
        JSON.stringify(response.data.vendor)
      );

      alert("Profile Updated Successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Profile Update Failed");

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white max-w-3xl mx-auto p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Vendor Profile
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          {/* Category */}
          <div>

            <label className="block mb-2 font-semibold">
              Business Category
            </label>

            <select
              name="category"
              value={profileData.category}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >

              <option value="">
                Select Category
              </option>

              <option>Interior Designer</option>
              <option>Furniture Shop</option>
              <option>Carpenter</option>
              <option>Modular Kitchen</option>
              <option>POP Work</option>
              <option>Civil Contractor</option>

            </select>

          </div>

          {/* Experience */}
          <div>

            <label className="block mb-2 font-semibold">
              Experience
            </label>

            <select
              name="experience"
              value={profileData.experience}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >

              <option value="">
                Select Experience
              </option>

              <option>1+ Years</option>
              <option>3+ Years</option>
              <option>5+ Years</option>
              <option>10+ Years</option>
              <option>15+ Years</option>

            </select>

          </div>

          {/* Service Area */}
          <div>

            <label className="block mb-2 font-semibold">
              Service Area
            </label>

            <select
              name="serviceArea"
              value={profileData.serviceArea}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >

              <option value="">
                Select Service Area
              </option>

              <option>Ahmednagar</option>
              <option>Pune</option>
              <option>Shrirampur</option>
              <option>Rahata</option>
              <option>Nashik</option>

            </select>

          </div>

          {/* Price Range */}
          <div>

            <label className="block mb-2 font-semibold">
              Starting Price
            </label>

            <select
              name="priceRange"
              value={profileData.priceRange}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >

              <option value="">
                Select Price Range
              </option>

              <option>₹10,000+</option>
              <option>₹50,000+</option>
              <option>₹1 Lakh+</option>
              <option>₹5 Lakh+</option>

            </select>

          </div>

          {/* Services */}
          <div>

            <label className="block mb-3 font-semibold">
              Services Offered
            </label>

            <div className="grid grid-cols-2 gap-3">

              {[
                "Modular Kitchen",
                "Wardrobe Design",
                "TV Unit",
                "Sofa Manufacturing",
                "POP Ceiling",
                "Furniture Repair",
              ].map((service) => (

                <label
                  key={service}
                  className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg cursor-pointer"
                >

                  <input
                    type="checkbox"
                    value={service}

                    checked={profileData.services.includes(service)}

                    onChange={(e) => {

                      if (e.target.checked) {

                        setProfileData({
                          ...profileData,
                          services: [
                            ...profileData.services,
                            service,
                          ],
                        });

                      } else {

                        setProfileData({
                          ...profileData,
                          services: profileData.services.filter(
                            (item) => item !== service
                          ),
                        });

                      }

                    }}
                  />

                  {service}

                </label>

              ))}

            </div>

          </div>

          {/* Portfolio Images */}
          <div>

            <label className="block mb-2 font-semibold">
              Portfolio Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full border p-3 rounded-lg bg-white"
            />

          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;