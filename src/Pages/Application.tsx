import { useEffect, useState } from "react";

const Application = () => {
  const [name, setName] = useState("");
  const [passport, setPassport] = useState("");
  const [visaType, setVisaType] = useState("");
  const [steps, setSteps] = useState({
    submitted: false,
    verified: false,
    approved: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("myVisaApplication");
    if (stored) {
      const parsed = JSON.parse(stored);
      setName(parsed.name);
      setPassport(parsed.passport);
      setVisaType(parsed.visaType);
      setSteps(parsed.steps);
    }
  }, []);

  useEffect(() => {
    const data = { name, passport, visaType, steps };
    localStorage.setItem("myVisaApplication", JSON.stringify(data));
  }, [name, passport, visaType, steps]);

  const handleCheckbox = (stepName: keyof typeof steps) => {
    setSteps({ ...steps, [stepName]: !steps[stepName] });
  };

  const completedSteps = Object.values(steps).filter(Boolean).length;
  const progressPercentage = (completedSteps / 3) * 100;

  const isFormFilled = name && passport && visaType;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl sm:text-4xl text-center font-bold mb-8 text-gray-800 dark:text-gray-100">
        My Application
      </h2>

      <div className="max-w-lg w-full mx-auto space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Passport Number"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
        />

        <select
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={visaType}
          onChange={(e) => setVisaType(e.target.value)}
        >
          <option value="">Select Visa Type</option>
          <option value="Tourist">Tourist</option>
          <option value="Business">Business</option>
          <option value="Student">Student</option>
        </select>

        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Application Progress
          </h4>

          {!isFormFilled && (
            <p className="text-sm text-red-500 mb-3">
             Please fill up the form first.
            </p>
          )}

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                disabled={!isFormFilled}
                checked={steps.submitted}
                onChange={() => handleCheckbox("submitted")}
              />
              Submitted
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                disabled={!isFormFilled}
                checked={steps.verified}
                onChange={() => handleCheckbox("verified")}
              />
              Document Verified
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                disabled={!isFormFilled}
                checked={steps.approved}
                onChange={() => handleCheckbox("approved")}
              />
              Approved
            </label>
          </div>

          {isFormFilled && (
            <>
              <div className="mt-4 w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                {progressPercentage}% completed
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
