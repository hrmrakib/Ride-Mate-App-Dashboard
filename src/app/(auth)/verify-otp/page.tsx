import VerifyOTPContent from "@/components/auth/VerifyOTPContent";
import React, { Suspense } from "react";

const VerifyOTPPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTPPage;
