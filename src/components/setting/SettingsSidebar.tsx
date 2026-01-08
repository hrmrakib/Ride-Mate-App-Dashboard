"use client";

import { ArrowRight } from "lucide-react";

type SettingSection = "profile" | "password" | "terms" | "privacy" | "about";

interface SettingsSidebarProps {
  activeSection: SettingSection;
  onSectionChange: (section: SettingSection) => void;
}

const menuItems = [
  { id: "profile", label: "Profile Information" },
  { id: "password", label: "Change Password" },
  { id: "terms", label: "Terms and Service" },
  { id: "privacy", label: "Privacy and Policy" },
  { id: "about", label: "About Us" },
] as const;

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className='w-full md:w-80 p-6 md:p-8'>
      <h1 className='text-3xl md:text-4xl text-[#333] font-bold mb-8 md:mb-12'>Settings</h1>
      <nav className='space-y-2 md:space-y-1'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id as SettingSection)}
            className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors text-left ${
              activeSection === item.id
                ? "bg-gray-200 text-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <span className='text-lg md:text-base font-medium'>
              {item.label}
            </span>
            <ArrowRight className='w-5 h-5 flex-shrink-0' />
          </button>
        ))}
      </nav>
    </aside>
  );
}
