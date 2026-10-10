import { useState } from "react";
import {
  CalendarDaysIcon,
  FileTextIcon,
  Loader2Icon,
  Send,
  X,
} from "lucide-react";
import api from "../../API/axios";
import toast from "react-hot-toast";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/leave", data);
      toast.success("Leave request submitted successfully");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to submit leave request",
      );
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Apply for leave
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Sub,it your leave request for approval
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* leave form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* leave type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FileTextIcon className="w-4 h-4 text-slate-400" />
              Leave Type
            </label>
            <select name="type" required>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>
          {/* duration */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <CalendarDaysIcon className="w-4 h-4 text-slate-400" />
              Duration
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-slate-400 mb-1">From</span>
                <input type="date" name="startDate" required min={minDate} />
              </div>

              <div>
                <span className="block text-xs text-slate-400 mb-1">To</span>
                <input type="date" name="endDate" required min={minDate} />
              </div>
            </div>
          </div>

          {/* reason */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Reason
            </label>
            <textarea
              name="reason"
              required
              rows={3}
              className="resize-none"
              placeholder="Breifly describe why tou need this leave..."
            />
          </div>

          {/* buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="btn-secondary flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
