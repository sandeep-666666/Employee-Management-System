import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import api from "../../API/axios";
import toast from "react-hot-toast";

const CheckinButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    try {
      await api.post("/attendance");
      onAction();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">Work Day Completed</h3>
        <p className="text-slate-500 text-sm mt-1">
          Greet job! see you tomorrow
        </p>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.checkIn; //converts to boolean
  return (
    <div className="absolute bottom-4 right-4 flex flex-col z-1">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-linear-to-br text-white ${isCheckedIn ? "from-slate-700 to-slate-900" : "from-indigo-600 to-indigo-700"}`}
      >
        {loading ? (
          <Loader2Icon className="animate-spin" size={20} />
        ) : isCheckedIn ? (
          <LogOutIcon size={20} />
        ) : (
          <LogInIcon size={20} />
        )}

        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-lg font-medium mb-1">
            {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>
          <p className="text-xs opacity-80">
            {isCheckedIn ? "Click to end your Shift" : "Start your work day"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CheckinButton;
