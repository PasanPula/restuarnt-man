import React from "react";

const CategorySelect = ({ categories, action, selected }) => {
  return (
    <select name="categories" id="categories" className="bg-transparent outline-none w-full capitalize text-base border-2 border-gray-200 p-2 rounded-md cursor-pointer" onChange={(e) => action(e.target.value)}>
    <option defaultValue={selected? selected: "Select category"}  className="bg-white capitalize">
      {selected? selected: "Select category"}
    </option>
    {categories
      // .filter((cat) => cat.urlParam !== selected)
      .map((category, index) => (
        <option key={index} value={category.urlParam} className = "text-base border-0 outline-none uppercase bg-white text-headingColor">
          {category.name}
        </option>
      ))}
  </select>
  )
};

export default CategorySelect;
