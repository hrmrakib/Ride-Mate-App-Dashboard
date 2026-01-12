"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/setting/SettingsSidebar";
import AboutUs from "@/components/setting/AboutUs";
import ChangePassword from "@/components/setting/ChangePassword";
import PrivacyPolicy from "@/components/setting/PrivacyPolicy";
import ProfileInfo from "@/components/setting/ProfileInfo";
import TermsAndService from "@/components/setting/TermsAndService";

type SettingSection = "profile" | "password" | "terms" | "privacy" | "about";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>("profile");

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileInfo />;
      case "password":
        return <ChangePassword />;
      case "terms":
        return <TermsAndService />;
      case "privacy":
        return <PrivacyPolicy />;
      case "about":
        return <AboutUs />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className='min-h-[80vh] bg-background m-6 rounded-xl'>
      <div className='flex flex-col md:flex-row'>
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className='flex-1 md:border-l border-border'>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
