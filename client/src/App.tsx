import { useReducer, useRef } from "react";
import { trpcClient } from "./utils/trpcClient";
import { jsPDF } from "jspdf";

type AnalysisResult = {
  score: string;
  strengths: string[];
  weaknesses: string[];
};

type ActionType =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: AnalysisResult }
  | { type: "ERROR" }
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" };

type State = {
  isLoading: boolean;
  isError: boolean;
  isModalOpen: boolean;
  result: AnalysisResult | null;
};

const initialState: State = {
  isLoading: false,
  isError: false,
  isModalOpen: false,
  result: null,
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, isError: false };
    case "SUCCESS":
      return { ...state, isLoading: false, result: action.payload };
    case "ERROR":
      return { ...state, isLoading: false, isError: true };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, result: null };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "LOADING" });
    dispatch({ type: "OPEN_MODAL" });

    const formData = new FormData(event.currentTarget);
    const resumeFile = formData.get("resume") as File;
    const jdFile = formData.get("jd") as File;

    if (!resumeFile || !jdFile) {
      alert("Please upload both resume and job description.");
      return;
    }

    try {
      const response = await trpcClient.analyzeResume.mutate(formData);

      const result =
        typeof response === "string"
          ? (JSON.parse(response) as AnalysisResult)
          : (response as AnalysisResult);

      dispatch({ type: "SUCCESS", payload: result });
    } catch (error) {
      console.error("Error during submission:", error);
      dispatch({ type: "ERROR" });
    }
  };

  const handleTryAgain = () => {
    dispatch({ type: "CLOSE_MODAL" });
    formRef.current?.reset();
  };

  const handleDownload = () => {
    if (!state.result) return;

    const doc = new jsPDF();
    const margin = 20;
    const lineHeight = 8;
    let y = margin;

    const wrapAndWrite = (text: string, indent = 0) => {
      const maxLineWidth = 180 - indent;
      const lines = doc.splitTextToSize(text, maxLineWidth);
      lines.forEach((line) => {
        if (y > 280) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin + indent, y);
        y += lineHeight;
      });
    };

    doc.setFontSize(16);
    wrapAndWrite("Resume Analysis Report");

    doc.setFontSize(12);
    y += 10;
    wrapAndWrite(`Score: ${state.result.score}/100`);

    y += 8;
    wrapAndWrite("Strengths:");

    state.result.strengths.forEach((item) => {
      wrapAndWrite(`• ${item}`, 5);
    });

    y += 8;
    wrapAndWrite("Weaknesses:");

    state.result.weaknesses.forEach((item) => {
      wrapAndWrite(`• ${item}`, 5);
    });

    doc.save("resume_analysis.pdf");
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-blue-600">Resume Analyzer</h1>
        <p className="text-gray-600 text-center">
          Upload your resume and job description to get an AI-powered analysis.
        </p>
        <form
          ref={formRef}
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="resume" className="w-full text-left cursor-pointer">
            Resume:
            <input
              name="resume"
              id="resume"
              type="file"
              accept=".pdf"
              className="mt-2 w-full border px-3 py-2 rounded cursor-pointer"
            />
          </label>
          <label htmlFor="jd" className="w-full text-left cursor-pointer">
            Job Description:
            <input
              name="jd"
              id="jd"
              type="file"
              accept=".pdf"
              className="mt-2 w-full border px-3 py-2 rounded cursor-pointer"
            />
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            type="submit"
          >
            Analyze Resume
          </button>
        </form>
      </div>

      {state.isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl cursor-pointer"
              onClick={handleTryAgain}
            >
              ✕
            </button>

            {state.isLoading && (
              <div className="text-blue-500 text-xl text-center">
                Analyzing...
              </div>
            )}

            {state.isError && (
              <div className="text-red-500 text-center text-lg">
                An error occurred during analysis.
              </div>
            )}

            {!state.isLoading && !state.isError && state.result && (
              <div className="text-gray-800 space-y-6">
                <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
                  Analysis Result
                </h2>
                <p className="text-center text-xl">
                  <strong>Score:</strong> {state.result.score}/100
                </p>

                <div>
                  <h3 className="font-semibold text-blue-500 text-lg">
                    Strengths:
                  </h3>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    {state.result.strengths.map((point, index) => (
                      <li key={`strength-${index}`}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-red-500 text-lg">
                    Weaknesses:
                  </h3>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    {state.result.weaknesses.map((point, index) => (
                      <li key={`weakness-${index}`}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <button
                    onClick={handleDownload}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow cursor-pointer"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={handleTryAgain}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
