"use client";
import { Category } from "@/types/productTypes";
import Button from "@/app/components/ui/Button";

// const platforms = [
//   "PC",
//   "PlayStation 5",
//   "PlayStation 4",
//   "Xbox Series",
//   "Nintendo Switch",
// ];
// const types = ["Paid", "Free"];
// const ratings = [4, 3, 2, 1];

export default function FilterSidebar({
  categories,
  selectedCategories,
  setSelectedCategories,
  onApply,
}: {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  onApply: () => void;
}) {
  // const [priceRange, setPriceRange] = useState([40, 55]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  return (
    <aside className="w-72 rounded-2xl bg-[#ffffff11] text-white space-y-6 py-8 px-7 h-min">
      <Section title="Categories">
        <CheckboxList
          items={[...categories.map((c) => c.name)]}
          selectedItems={selectedCategories}
          onChange={handleCategoryChange}
        />
      </Section>

    

      <Button text="Apply Filters" onClick={onApply} className="w-full" />
    </aside>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h4 className="text-md font-semibold mb-2">{title}</h4>
    {children}
  </div>
);

const CheckboxList = ({
  items,
  selectedItems = [],
  onChange,
}: {
  items: string[];
  selectedItems?: string[];
  onChange?: (item: string) => void;
}) => (
  <div className="space-y-2">
    {items.map((item) => {
      const checked = selectedItems.includes(item);
      return (
        <label
          key={item}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="relative">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange?.(item)}
              className="sr-only"
            />
            <span
              className={`w-5 h-5 inline-block rounded-md border-2 transition-colors
                  ${
                    checked
                      ? "bg-orange-500 border-orange-500"
                      : "bg-[#2B2417] border-white/30"
                  }`}
            >
              {checked && (
                <svg
                  className="w-full h-full text-white p-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          </div>
          <span className="text-sm text-gray-300">{item}</span>
        </label>
      );
    })}
  </div>
);

// const StarRating = ({ stars }: { stars: number }) => (
//   <div className="flex text-orange-400">
//     {[...Array(5)].map((_, i) => (
//       <span key={i}>{i < stars ? "★" : "☆"}</span>
//     ))}
//   </div>
// );
