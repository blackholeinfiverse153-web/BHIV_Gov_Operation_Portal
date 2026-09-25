import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, LoaderCircle, RefreshCw } from "lucide-react";
import { getRequests, type RequestData } from "../services/api";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      const loadRequest = async () => {
        setLoading(true);
        setError("");
        setRequest(null);
        try {
          const requests = await getRequests();
          if (!active) return;
          const match = id
            ? requests.find((item) => item.requestId === id || item.id === id)
            : undefined;
          setRequest(match ?? null);
        } catch (reason) {
          if (active) setError(reason instanceof Error ? reason.message : "Unable to load request details.");
        } finally {
          if (active) setLoading(false);
        }
      };
      void loadRequest();
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [id]);

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"><div className="flex items-center gap-3 text-slate-600"><LoaderCircle className="animate-spin text-teal-700" size={21} /> Loading request details...</div></div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-red-900"><div className="flex items-start gap-3"><AlertTriangle className="mt-0.5 shrink-0" size={21} /><div><h1 className="text-xl font-bold">Unable to load request details</h1><p className="mt-2 text-sm">{error}</p><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => window.location.reload()} className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white"><RefreshCw size={16} /> Retry</button><button type="button" onClick={() => navigate("/requests")} className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-800">Back to Requests</button></div></div></div></div>;
  }

  if (!request) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Request Not Found</h1>
        <p className="mt-2 text-slate-500">No request with reference <span className="font-semibold text-slate-700">{id || "the supplied ID"}</span> was returned by the connected service.</p>
        <button type="button" onClick={() => navigate("/requests")} className="mt-5 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-900">Back to Requests</button>
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