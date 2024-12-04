import React, { ChangeEvent, useRef, useState } from "react";

interface IColorPickerInputProps {
  value: string;
  name: string;
  onChange: (color: ChangeEvent<HTMLInputElement>) => void;
}

const ColorPickerInput = (props: IColorPickerInputProps) => {
  const { value, onChange, name } = props;
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleTextInputClick = () => {
    setShowColorPicker(true);
    colorInputRef.current?.click();
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowColorPicker(false);
    onChange(e);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    if (/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(newColor)) {
      onChange(e);
    }
  };

  return (
    <div className="flex items-center">
      <input
        name={name}
        type="color"
        ref={colorInputRef}
        value={value}
        onChange={handleColorChange}
        className={`absolute border-none w-0 h-0 mt-2 ${
          showColorPicker ? "visible" : "invisible"
        }`}
      />
      <input
        name={name}
        type="text"
        value={value}
        onClick={handleTextInputClick}
        onChange={handleTextChange}
        className="border-blue-500 p-1 w-full cursor-pointer"
        style={{ backgroundColor: value }}
      />
    </div>
  );
};

export default ColorPickerInput;
