import React, { Suspense } from "react";

const VerifyOTPPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPPage />
    </Suspense>
  );
};

export default VerifyOTPPage;
