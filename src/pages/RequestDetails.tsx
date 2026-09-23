import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequests, type RequestData } from "../services/api";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const requests = await getRequests();
        setRequest(
          requests.find((item) => item.requestId === id) ?? null
        );
      } catch (error) {
        console.error("Failed to load request:", error);
        setRequest(null);
      } finally {
        setLoading(false);
      }
    };

    void loadRequest();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading request...</div>;
  }

  // Request सापडली नाही तर message दाखवतो
  if (!request) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-red-600">
            Request Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            The requested record could not be found.
          </p>

          <button
            onClick={() => navigate("/requests")}
            className="mt-5 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Request Details
          </h1>

          <p className="text-gray-500 mt-1">
            Complete information about this request
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/requests")}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          Back to Requests
        </button>

      </div>

      {/* Request Details Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* Request ID */}
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">
            Request ID
          </p>

          <p className="text-lg font-semibold text-blue-600">
            {request.requestId}
          </p>
        </div>

        {/* Citizen Name */}
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">
            Citizen Name
          </p>

          <p className="text-lg font-medium text-slate-800">
            {request.citizenName}
          </p>
        </div>

        {/* Request Type */}
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">
            Request Type
          </p>

          <p className="text-lg font-medium text-slate-800">
            {request.requestType}
          </p>
        </div>

        {/* Department */}
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">
            Department
          </p>

          <p className="text-lg font-medium text-slate-800">
            {request.department}
          </p>
        </div>

        {/* Status */}
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">
            Status
          </p>

          <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            {request.status}
          </span>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Description
          </p>

          <p className="text-gray-700">
            {request.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default RequestDetails;