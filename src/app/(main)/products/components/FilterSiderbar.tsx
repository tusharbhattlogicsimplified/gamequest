"use client";
import { Category } from "@/types/productTypes";
import Button from "@/app/components/ui/Button";
import RatingStars from "@/app/components/ui/RatingStars";

export default function FilterSidebar({
  categories,
  selectedCategories,
  setSelectedCategories,
  onApply,
  selectedRating,
  setSelectedRating,
}: {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  onApply: (rating: number | null) => void;
  selectedRating: number | null;
  setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>;
}) {
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

      <Section title="Ratings">
        <RatingOptions
          selectedRating={selectedRating}
          onChange={setSelectedRating}
        />
      </Section>

      <Button
        text="Apply Filters"
        onClick={() => onApply(selectedRating)}
        className="w-full"
      />
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
const RatingOptions = ({
  selectedRating,
  onChange,
}: {
  selectedRating: number | null;
  onChange: (rating: number) => void;
}) => {
  const ratingValues = [4, 3, 2, 1];

  return (
    <div>
      {ratingValues.map((rating) => {
        const isSelected = selectedRating === rating;
        return (
          <label
            key={rating}
            className={`
              flex items-center gap-x-3 cursor-pointer p-2 rounded-lg transition-all duration-200
              border border-transparent
              ${isSelected ? "bg-[#04030189] text-orange-400 border-orange-400" : "text-gray-300 hover:bg-[#ffffff08]"}
            `}
          >
            <input
              type="radio"
              name="rating"
              value={rating}
              checked={isSelected}
              onChange={() => onChange(rating)}
              className="sr-only"
            />
            <RatingStars rating={rating} size={16} />
            <span>& Up</span>
          </label>
        );
      })}
    </div>
  );
};




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
                ${checked ? "bg-orange-500 border-orange-500" : "bg-[#2B2417] border-white/30"}`}
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