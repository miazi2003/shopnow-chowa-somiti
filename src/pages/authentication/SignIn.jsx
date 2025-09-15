import { useContext, useState } from "react";
import SquareImageUploader from "../../component/SquareImageUploader";
import AuthProvider from "../../context/AuthProvider";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

function MemberSignupPage() {
   const [error, setError] = useState("");
  const [imageList, setImageList] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const { createUser , updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log("Form Data:", data);

    const { memberEmail, memberPassword, memberName } = data;

    const formData = {
      ...data,
      images: imageList,
    };

    createUser(memberEmail, memberPassword)
      .then(async (res) => {
        console.log("Firebase user created:", res.user);

        // ✅ Update displayName with memberName
        await updateUser(memberName);

        // ✅ Save user data to backend
        const respond = await axios.post(
          "http://localhost:5000/users",
          formData
        );
        console.log(respond.data);

        toast.success("মেম্বার যুক্ত হয়েছে");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("মেম্বার যুক্ত করা সম্ভব হয়নি");
        setLoading(false);
      });

    e.target.reset();
    setImageList([]);
    setResetKey((k) => k + 1);
  };
  return (
    <div className="min-h-screen flex items-center justify-center  py-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">সদস্য ফর্ম</h2>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* সদস্যের তথ্য */}

          <div>
            <h3 className="text-lg font-semibold mb-3 border-b pb-1">
              সদস্যের তথ্য
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  সদস্যের ইমেইল আইডি *
                </label>
                <input
                  type="email"
                  name="memberEmail"
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  সদস্যের জন্য পাসওয়ার্ড নির্ধারন *
                </label>
                <input
                  type="password"
                  name="memberPassword"
                  required
                  className="input input-bordered w-full"
                  value={123456}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  সদস্যের নামঃ(জাতীয় পরিচয়পত্র অনুযায়ী) *
                </label>
                <input
                  type="text"
                  name="memberName"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  সদস্যের পিতার নামঃ *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  সদস্যের মাতার নামঃ *
                </label>
                <input
                  type="text"
                  name="motherName"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  সদস্যের জাতীয় পরিচয়পত্র নংঃ
                </label>
                <input
                  type="text"
                  name="nidNumber"
                  className="input input-bordered w-full"
                />
              </div>
              {/* 
              <div>
                <label className="block text-sm font-medium">
                  সদস্যের স্বাক্ষরের ছবি
                </label>
                <input
                  type="file"
                  name="signature"
                  className="file-input file-input-bordered w-full"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium">
                  জন্মনিবন্ধন নং (যদি NID না থাকে)
                </label>
                <input
                  type="text"
                  name="birthRegNumber"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  মোবাইল নাম্বার ১ *
                </label>
                <input
                  type="text"
                  name="mobile1"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  মোবাইল নাম্বার ২ *
                </label>
                <input
                  type="text"
                  name="mobile2"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  WhatsApp নাম্বার *
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Address Section */}
            <h4 className="text-md font-semibold mt-4">বর্তমান ঠিকানা</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                name="presentVillage"
                placeholder="গ্রাম *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="presentPost"
                placeholder="ডাকঘর *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="presentThana"
                placeholder="থানা *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="presentDistrict"
                placeholder="জেলা *"
                className="input input-bordered w-full"
              />
            </div>

            <h4 className="text-md font-semibold mt-4">স্থায়ী ঠিকানা</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                name="permanentVillage"
                placeholder="গ্রাম *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="permanentPost"
                placeholder="ডাকঘর *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="permanentThana"
                placeholder="থানা *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="permanentDistrict"
                placeholder="জেলা *"
                className="input input-bordered w-full"
              />
            </div>

            {/* Income Source */}
            <div className="mt-4">
              <label className="block text-sm font-medium">আয়ের উৎসঃ *</label>
              <select
                name="incomeSource"
                className="select select-bordered w-full"
              >
                <option value="">-- নির্বাচন করুন --</option>
                <option value="চাকরী">চাকরী</option>
                <option value="ব্যবসা">ব্যবসা</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">
                আপনি কয়টি সদস্য পদ নিতে চান? *
              </label>
              <input
                type="number"
                name="membershipCount"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Nominee Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 border-b pb-1">
              সদস্যের নমিনী তথ্য
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nomineeName"
                placeholder="নমিনীর নাম *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="nomineeFather"
                placeholder="নমিনীর পিতার নাম *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="nomineeMother"
                placeholder="নমিনীর মাতার নাম *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="nomineeMobile1"
                placeholder="নমিনীর মোবাইল নাম্বার ১ *"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="nomineeMobile2"
                placeholder="নমিনীর মোবাইল নাম্বার ২ *"
                className="input input-bordered w-full"
              />
            </div>

            <div className="mt-4">
              <textarea
                name="nomineePermanent"
                placeholder="নমিনীর স্থায়ী ঠিকানা (সম্পূর্ণ) *"
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div className="mt-4">
              <textarea
                name="nomineePresent"
                placeholder="নমিনীর বর্তমান ঠিকানা (সম্পূর্ণ) *"
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="nomineeNidNumber"
                placeholder="নমিনীর জাতীয় পরিচয়পত্র নং"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="nomineeBirthReg"
                placeholder="নমিনীর জন্মনিবন্ধন নং"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <SquareImageUploader onUpload={(urls) => setImageList(urls)}  clearKey={resetKey} />

          <button
            type="submit"
            className="btn w-full bg-[#4d6b57] border-[#4d6b57] text-white"
          >
            {loading ? "সাবমিট করা হচ্ছে" : "সাবমিট করুন"} 
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberSignupPage;
