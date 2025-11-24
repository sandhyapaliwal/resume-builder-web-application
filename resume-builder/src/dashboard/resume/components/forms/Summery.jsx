import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import ThemeColor from "../ThemeColor";  // import added

//  - enabledNext: function to enable moving to next step after save
function Summery({ resumeId, enabledNext, goToNextStep, goToPreviousStep }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summery, setSummery] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false); // Local state to track generating (not used here but may be for AI auto-summary generation)

  // Sync local summery from resumeInfo.summery on any change in context
  useEffect(() => {
    if (resumeInfo && typeof resumeInfo.summery === "string") {
      setSummery(resumeInfo.summery); // if resume info has summary string, update local state
    } else {
      setSummery("");
    }
  }, [resumeInfo.summery]);

  // Handle input change in Textarea
  const handleChange = (e) => {
    const value = e.target.value;
    setSummery(value); // update local state
    if (setResumeInfo) setResumeInfo({ ...resumeInfo, summery: value }); // also update global resumeInfo context
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!resumeId) return toast.error("Resume not found for update.");
    setLoading(true);
    const dataPayload = { summery }; // Prepare payload with summary text
    // Call API to update resume summary using resumeId
    GlobalApi.PatchResumeByResumeId(resumeId, dataPayload)
      .then(() => {
        enabledNext && enabledNext(true); // If enabledNext function is passed, allow moving to next step
        toast.success("Details updated");
      })
      .catch(() => {
        toast.error("Failed to update details");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ThemeColor />
      <form onSubmit={onSave}>
        <Textarea
          label="Summary"
          value={summery}
          onChange={handleChange} // Updates summary when user types
          rows={6}
          placeholder="Write a brief summary"
        />

        {/* Button group */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "12px" }}>
           {/* Optional Back button if previous step handler is provided */}
          {goToPreviousStep && (
            <Button type="button" onClick={goToPreviousStep} variant="outline">
              Back
            </Button>
          )}

          <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle /> : "Save"}
            </Button>

          {/* Next button (if goToNextStep handler provided) */}
            {goToNextStep && (
              <Button type="button" onClick={goToNextStep} variant="outline">
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default Summery;
