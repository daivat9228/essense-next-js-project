'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  setCategories,
  setFamilies,
  setConcentrations,
  setSizes,
  setBrands,
  setPriceRange,
  clearFilters,
} from '@/store/slices/filtersSlice';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FiltersProps {
  products: any[];
}

export default function Filters({ products }: FiltersProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    family: true,
    concentration: true,
    size: false,
    brand: false,
    price: true,
  });

  // Extract unique values from products
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const uniqueFamilies = [...new Set(products.map(p => p.family))];
  const uniqueConcentrations = [...new Set(products.map(p => p.concentration))];
  const uniqueSizes = [...new Set(products.flatMap(p => p.sizes.map(s => s.sizeMl)))].sort((a, b) => a - b);
  const uniqueBrands = [...new Set(products.map(p => p.brand))].sort();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    dispatch(setCategories(newCategories));
  };

  const handleFamilyChange = (family: string) => {
    const newFamilies = filters.families.includes(family)
      ? filters.families.filter(f => f !== family)
      : [...filters.families, family];
    dispatch(setFamilies(newFamilies));
  };

  const handleConcentrationChange = (concentration: string) => {
    const newConcentrations = filters.concentrations.includes(concentration)
      ? filters.concentrations.filter(c => c !== concentration)
      : [...filters.concentrations, concentration];
    dispatch(setConcentrations(newConcentrations));
  };

  const handleSizeChange = (size: number) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    dispatch(setSizes(newSizes));
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    dispatch(setBrands(newBrands));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newRange: [number, number] = [...filters.priceRange];
    if (name === 'min') {
      newRange[0] = parseInt(value);
    } else {
      newRange[1] = parseInt(value);
    }
    dispatch(setPriceRange(newRange));
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.families.length > 0 ||
    filters.concentrations.length > 0 ||
    filters.sizes.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500;

  const FilterSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    sectionKey: keyof typeof expandedSections; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary-600"
      >
        {title}
        {expandedSections[sectionKey] ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(clearFilters())}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category */}
        <FilterSection title="Category" sectionKey="category">
          {uniqueCategories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </FilterSection>

        {/* Fragrance Family */}
        <FilterSection title="Fragrance Family" sectionKey="family">
          {uniqueFamilies.map((family) => (
            <label key={family} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.families.includes(family)}
                onChange={() => handleFamilyChange(family)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{family}</span>
            </label>
          ))}
        </FilterSection>

        {/* Concentration */}
        <FilterSection title="Concentration" sectionKey="concentration">
          {uniqueConcentrations.map((concentration) => (
            <label key={concentration} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.concentrations.includes(concentration)}
                onChange={() => handleConcentrationChange(concentration)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{concentration}</span>
            </label>
          ))}
        </FilterSection>

        {/* Size */}
        <FilterSection title="Size" sectionKey="size">
          {uniqueSizes.map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{size}ml</span>
            </label>
          ))}
        </FilterSection>

        {/* Brand */}
        <FilterSection title="Brand" sectionKey="brand">
          <div className="max-h-40 overflow-y-auto">
            {uniqueBrands.map((brand) => (
              <label key={brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="price">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="number"
                name="min"
                value={filters.priceRange[0]}
                onChange={handlePriceChange}
                placeholder="Min"
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                name="max"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                placeholder="Max"
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="text-sm text-gray-600">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </div>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}