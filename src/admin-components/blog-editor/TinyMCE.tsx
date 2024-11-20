// "use client";
import { Editor } from "@tinymce/tinymce-react";

export const TinyMCEEditor = ({
  label,
  handleEditorChange,
  content
}: {
  label: string;
  handleEditorChange: any;
  content: string;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <Editor
        apiKey={process.env.YOUR_TINYMCE_API_KEY}
        value={ content}
        init={{
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            "checklist",
            "mediaembed",
            "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            "inlinecss",
            "markdown",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | removeformat",
          tinycomments_mode: "embedded",
        }}
        initialValue="<p>Write your content here...</p>"
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};
