import { FileInput, Select, TextInput, Button } from "flowbite-react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
Quill.register("modules/imageResize", ImageResize);
export default function CreatePost() {
  const modules = {
    toolbar: [
      ["blockquote", "code-block"],
      ["bold", "italic", "underline"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  return (
    <div className="p3 max-w-3xl mx-auto min-h-screen">
      <div className="text-center text-3xl my-7 font-semibold">
        Написать пост
      </div>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Заголовок"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Без категории</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Загрузить фото
          </Button>
        </div>
        <ReactQuill
          modules={modules}
          theme="snow"
          placeholder="Начните писать свою статью"
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Опубликовать
        </Button>
      </form>
    </div>
  );
}
