// components/SectionedTaskList.tsx
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { HabitTracker } from "./HabitTracker";
import ComprasTaskList from "./ComprasTaskList";
import CompromisosProfesionalesList from "./CompromisosProfesionalesList";

interface SectionedTaskListProps {
  title?: string;
  sections: { key: string; label: string }[];
  containerClassName?: string;
}

export function SectionedTaskList({ title, sections, containerClassName }: SectionedTaskListProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10 tracking-tight">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-6">
        {sections.map((section) => (
          <div
            key={section.key}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl overflow-hidden w-full"
          >
            <button
              onClick={() => toggleSection(section.key)}
              className="flex items-center justify-between w-full px-6 py-4 text-left text-lg font-semibold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span>{section.label}</span>
              {openSections[section.key] ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            {openSections[section.key] && (
              <div className="px-6 pb-6 pt-2 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out">
                {section.key === "habitos" && <HabitTracker />}
                {section.key === "compras" && <ComprasTaskList />}
                {["cnmh", "mjd", "ingennia"].includes(section.key) && (
                  <CompromisosProfesionalesList categoria={section.key.toUpperCase()} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}