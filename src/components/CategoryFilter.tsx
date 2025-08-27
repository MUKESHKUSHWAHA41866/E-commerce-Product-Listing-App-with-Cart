// "use client";
// import { useSearchFilterStore } from "@/store/useSearchFilterStore";

// export default function CategoryFilter({
//   categories,
// }: {
//   categories: { id: string; name: string }[];
// }) {
//   const { categoryId, setCategoryId } = useSearchFilterStore();
//   return (
//     <select
//       value={categoryId ?? ""}
//       onChange={(e) => setCategoryId(e.target.value || null)}
//       className="border rounded-xl px-3 py-2"
//     >
//       <option value="">All</option>
//       {categories.map((c) => (
//         <option key={c.id} value={c.id}>
//           {c.name}
//         </option>
//       ))}
//     </select>
//   );
// }



// "use client";
// import { useSearchFilterStore } from "@/store/useSearchFilterStore";

// export default function CategoryFilter({
//   categories,
// }: {
//   categories: { id: string; name: string }[];
// }) {
//   const { categoryId, setCategoryId } = useSearchFilterStore();

//   return (
//     <select
//       value={categoryId ?? ""}
//       onChange={(e) => setCategoryId(e.target.value || null)}
//       className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-inner outline-none transition
//                  hover:bg-white/10 focus:border-cyan-400/40 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/15"
//     >
//       <option value="">All</option>
//       {categories.map((c) => (
//         <option key={c.id} value={c.id}>
//           {c.name}
//         </option>
//       ))}
//     </select>
//   );
// }




// "use client";

// import { useSearchFilterStore } from "@/store/useSearchFilterStore";
// import { useMemo, useRef, useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// type Cat = { id: string; name: string };

// export default function CategoryFilter({ categories }: { categories: Cat[] }) {
//   const { categoryId, setCategoryId } = useSearchFilterStore();
//   const [open, setOpen] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Close when clicking outside
//   useEffect(() => {
//     const onDown = (e: MouseEvent) => {
//       if (!wrapperRef.current) return;
//       if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
//     };
//     window.addEventListener("mousedown", onDown);
//     return () => window.removeEventListener("mousedown", onDown);
//   }, []);

//   // Build option list; remove duplicate "All" categories
//   const options = useMemo(() => {
//     const unique = new Map<string, Cat>();
//     for (const c of categories) {
//       if (!unique.has(c.id)) unique.set(c.id, c);
//     }
//     const cleaned = [...unique.values()].filter(
//       (c) => c.name.trim().toLowerCase() !== "all"
//     );
//     return [{ id: "", name: "All" }, ...cleaned];
//   }, [categories]);

//   const selected = options.find((o) => o.id === (categoryId ?? "")) ?? options[0];

//   const choose = (id: string) => {
//     setCategoryId(id || null);
//     setOpen(false);
//   };

//   return (
//     <div className="relative" ref={wrapperRef}>
//       {/* Button */}
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         className="group inline-flex items-center gap-2 rounded-2xl border border-white/10
//                    bg-white/5 px-4 py-2.5 text-sm shadow-inner outline-none transition
//                    hover:bg-white/10 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/15"
//         aria-haspopup="listbox"
//         aria-expanded={open}
//       >
//         <span className="truncate max-w-[12rem]">{selected.name}</span>
//         <svg
//           className={`h-4 w-4 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path d="M6 9l6 6 6-6" />
//         </svg>
//       </button>

//       {/* Dropdown */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 6, scale: 0.98 }}
//             animate={{ opacity: 1, y: 4, scale: 1 }}
//             exit={{ opacity: 0, y: 6, scale: 0.98 }}
//             transition={{ duration: 0.15 }}
//             className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10
//                        bg-[#0b0c10]/95 shadow-2xl backdrop-blur"
//             role="listbox"
//             tabIndex={-1}
//           >
//             {options.map((o) => {
//               const active = o.id === (categoryId ?? "");
//               return (
//                 <button
//                   key={o.id || "all"}
//                   onClick={() => choose(o.id)}
//                   className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm
//                              transition hover:bg-white/5 ${
//                                active ? "text-cyan-200" : "text-zinc-200"
//                              }`}
//                   role="option"
//                   aria-selected={active}
//                 >
//                   <span className="truncate">{o.name}</span>
//                   {active && (
//                     <svg
//                       className="h-4 w-4 opacity-90"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M20 6L9 17l-5-5" />
//                     </svg>
//                   )}
//                 </button>
//               );
//             })}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




"use client";

import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Cat = { id: string; name: string };

export default function CategoryFilter({ categories }: { categories: Cat[] }) {
  const { categoryId, setCategoryId } = useSearchFilterStore();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  const selected =
    categories.find((o) => o.id === (categoryId ?? "")) ?? { id: "", name: "All" };

  const choose = (id: string) => {
    setCategoryId(id || null);
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-2 rounded-2xl border border-white/10
                   bg-white/5 px-4 py-2.5 text-sm shadow-inner outline-none transition
                   hover:bg-white/10 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/15"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate max-w-[12rem]">{selected.name}</span>
        <svg
          className={`h-4 w-4 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10
                       bg-[#0b0c10]/95 shadow-2xl backdrop-blur"
            role="listbox"
            tabIndex={-1}
          >
            {/* Always add "All" option on top */}
            {/* <button
              key="all"
              onClick={() => choose("")}
              className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm
                         transition hover:bg-white/5 ${
                           categoryId === null || categoryId === "" ? "text-cyan-200" : "text-zinc-200"
                         }`}
              role="option"
              aria-selected={categoryId === null || categoryId === ""}
            >
              <span className="truncate">All</span>
              {(categoryId === null || categoryId === "") && (
                <svg
                  className="h-4 w-4 opacity-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button> */}

            {categories.map((c) => {
              const active = c.id === (categoryId ?? "");
              return (
                <button
                  key={c.id}
                  onClick={() => choose(c.id)}
                  className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm
                             transition hover:bg-white/5 ${active ? "text-cyan-200" : "text-zinc-200"}`}
                  role="option"
                  aria-selected={active}
                >
                  <span className="truncate">{c.name}</span>
                  {active && (
                    <svg
                      className="h-4 w-4 opacity-90"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
