import React, { useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Mark } from "@tiptap/core";
import  "./App.css";

// Custom Highlight Extension with Dynamic Color
const Highlight = Mark.create({
  name: "highlight",

  addAttributes() {
    return {
      color: {
        default: "yellow",
        parseHTML: (element) => element.style.backgroundColor,
        renderHTML: (attributes) => ({
          style: `background-color: ${attributes.color}; padding: 2px; border-radius: 3px;`,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span", getAttrs: (node) => node.style?.backgroundColor }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      toggleHighlight:
        (color = "yellow") =>
        ({ commands }) => {
          return commands.toggleMark("highlight", { color });
        },
    };
  },
});

const App = () => {
  const [color, setColor] = useState("#ffff00"); // Default yellow color

  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: "<p>Try selecting this text and applying different highlight colors! lorem20 Try selecting this text and applying different highlight colorsTry selecting this text and applying different highlight colors</p>",
  });

  const handleHighlight = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleHighlight(color).run();
    }
  }, [editor, color]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto"}}>
      <h2 
  style={{
    color: "#ffffff", 
    backgroundColor: "orange", 
    fontSize: "40px",
    padding: "30px 80px", 
    position: "absolute", 
    top: -40,
  }}
>
  FourTrax Technologies
</h2>

      <h2 style={{ color: "#ffffff", backgroundColor: "lightgreen", padding: '30px', marginBottom: "70px" }}>Custom Tiptap Highlight Extension</h2>

      {/* Color Picker */}
      <label style={{color: "#fff", fontWeight: "bold"}}>
        Select Highlight Color =:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ margin: "0 0 20px 10px" }}
        />
      </label>

      {/* Highlight Button */}
      <button
        onClick={handleHighlight}
        style={{
          marginLeft: "10px",
          padding: "8px 12px",
          cursor: "pointer",
          backgroundColor: color,
          border: "none",
          borderRadius: "4px",
        }}
      >
        Highlight
      </button>

      {/* Editor Container */}
      <div style={{backgroundColor: "#fff", border: "5px solid #ccc", padding: "10px", minHeight: "150px", marginTop: "10px" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default App;
