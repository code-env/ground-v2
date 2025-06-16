"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CaretPosition {
  x: number;
  y: number;
  height: number;
}

interface CustomCaretProps {
  position: CaretPosition;
  isVisible: boolean;
  isFocused: boolean;
  hasSelection: boolean;
}

const CustomCaret: React.FC<CustomCaretProps> = ({
  position,
  isVisible,
  isFocused,
  hasSelection,
}) => {
  if (!isFocused || hasSelection) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.1 }}
      className="absolute pointer-events-none w-[2px] bg-blue-500"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        height: `${position.height}px`,
      }}
    />
  );
};

interface CustomTextareaProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  rows?: number;
}

const CustomTextarea = ({
  placeholder = "Type something...",
  defaultValue = "",
  className = "",
  rows = 5,
}: CustomTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(defaultValue);
  const [caretPosition, setCaretPosition] = useState<CaretPosition>({
    x: 0,
    y: 0,
    height: 20,
  });
  const [isCaretVisible, setIsCaretVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [selectionRange, setSelectionRange] = useState<{
    start: number;
    end: number;
  } | null>(null);

  // Toggle caret visibility for blinking effect
  useEffect(() => {
    if (!isFocused) return;

    const interval = setInterval(() => {
      setIsCaretVisible((prev) => !prev);
    }, 530); // Standard caret blink rate

    return () => clearInterval(interval);
  }, [isFocused]);

  // Update caret position when text changes or on selection change
  const updateCaretPosition = () => {
    if (!textareaRef.current || !overlayRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Update selection range
    if (start !== end) {
      setSelectionRange({ start, end });
    } else {
      setSelectionRange(null);
    }

    // Create a temporary element to measure text dimensions
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.style.wordBreak = "break-word";
    tempElement.style.width = `${textarea.clientWidth}px`;
    tempElement.style.font = window.getComputedStyle(textarea).font;
    tempElement.style.padding = window.getComputedStyle(textarea).padding;

    // Get text before caret
    const textBeforeCaret = text.substring(0, start);

    // Handle empty text or caret at the beginning
    if (!textBeforeCaret) {
      setCaretPosition({
        x: Number.parseInt(window.getComputedStyle(textarea).paddingLeft),
        y: Number.parseInt(window.getComputedStyle(textarea).paddingTop),
        height:
          Number.parseInt(window.getComputedStyle(textarea).lineHeight) || 20,
      });
      return;
    }

    // Add text content and line break element
    tempElement.textContent = textBeforeCaret;
    tempElement.innerHTML += '<span id="caret-position"></span>';

    // Append to body, measure, then remove
    document.body.appendChild(tempElement);
    const caretEl = tempElement.querySelector("#caret-position");

    if (caretEl) {
      const caretRect = caretEl.getBoundingClientRect();
      const textareaRect = textarea.getBoundingClientRect();

      setCaretPosition({
        x: caretRect.left - textareaRect.left,
        y: caretRect.top - textareaRect.top,
        height:
          Number.parseInt(window.getComputedStyle(textarea).lineHeight) || 20,
      });
    }

    document.body.removeChild(tempElement);
  };

  // Handle text change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    updateCaretPosition(); // Update immediately
    // Double check position after DOM update
    requestAnimationFrame(() => {
      requestAnimationFrame(updateCaretPosition);
    });
  };

  // Handle selection and caret position updates
  const handleSelect = () => {
    requestAnimationFrame(updateCaretPosition);
  };

  // Handle key events for caret updates
  const handleKeyUp = () => {
    requestAnimationFrame(updateCaretPosition);
  };

  // Handle mouse events
  const handleMouseUp = () => {
    requestAnimationFrame(updateCaretPosition);
  };

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
    updateCaretPosition();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSelectionRange(null);
  };

  // Focus the textarea when clicking on the container
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      textareaRef.current?.focus();
    }
  };

  // Render the selected text highlight
  const renderHighlight = () => {
    if (!selectionRange || !isFocused) return null;

    const { start, end } = selectionRange;
    const beforeSelection = text.substring(0, start);
    const selection = text.substring(start, end);
    const afterSelection = text.substring(end);

    return (
      <div className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-words p-3 text-transparent">
        <span>{beforeSelection}</span>
        <span className="bg-blue-200 text-transparent">{selection}</span>
        <span>{afterSelection}</span>
      </div>
    );
  };

  return (
    <div
      className={`relative rounded-md border border-input ${className}`}
      onClick={handleContainerClick}
    >
      {/* Text highlight overlay */}
      {renderHighlight()}

      {/* Custom caret */}
      <AnimatePresence>
        <CustomCaret
          position={caretPosition}
          isVisible={isCaretVisible}
          isFocused={isFocused}
          hasSelection={!!selectionRange}
        />
      </AnimatePresence>

      {/* Text display overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-words p-3 text-transparent"
      >
        {text || placeholder}
      </div>

      {/* Actual textarea (invisible but functional) */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onSelect={handleSelect}
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        className="relative w-full h-full p-3 bg-transparent text-foreground resize-none border"
        style={{ caretColor: "transparent" }} // Hide the native caret
      />
    </div>
  );
};

export default CustomTextarea;
