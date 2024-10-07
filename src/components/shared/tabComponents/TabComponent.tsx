import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TabItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface TabsComponentProps {
  items: TabItem[];
  selectedTab: string;
  setSelectedTab: (title: string) => void;
}

function TabsComponent({
  items,
  selectedTab,
  setSelectedTab,
}: TabsComponentProps) {
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstBtnRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full flex-col gap-y-2">
        <div className="flex items-center justify-between gap-x-2 rounded-[5px] bg-[#F6F0E7] p-[12px_10px] font-bold text-white">
          {items.map((item, index) => (
            <motion.button
              ref={selectedTab === item.value ? firstBtnRef : null}
              key={item.title}
              onClick={() => setSelectedTab(item.value)}
              className={`relative w-full rounded-[5px] !border-none py-[14px] text-center text-xs font-normal text-[#8E8A87] !outline-none !ring-0 hover:bg-primary-400 hover:text-white focus:bg-primary-500 focus:text-white focus:ring-2 sm:text-sm ${
                selectedTab === item.value
                  ? "bg-primary-500 font-semibold text-white sm:font-bold"
                  : " font-normal"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.title}
            </motion.button>
          ))}
        </div>
        <div className="rounded-xl bg-white p-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {items.find((item) => item.value === selectedTab)?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TabsComponent;
