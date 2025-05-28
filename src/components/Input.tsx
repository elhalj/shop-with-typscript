import { useState, type ChangeEvent } from "react";

export type Field = {
  name: string;
  label: string;
  type: "text" | "password" | "email";
};

type InputProps = {
  fields: Field[];
  handleSubmit: (data: Record<string, string>) => Promise<void>;
  initialData: Record<string, string>;
  submitText: string;
  loadingText: string;
  error: string | null;
};

const Input = ({
  fields,
  handleSubmit,
  initialData,
  submitText,
  loadingText,
  error,
}: InputProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    ...initialData,
  });
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        handleSubmit(formData).finally(() => { setIsLoading(false);  setFormData({ ...initialData }); });
  };

  const InputFields = fields.map((field) => {
    switch (field.type) {
      case "text":
      case "password":
      case "email":
        return (
          <label key={field.name} className="flex flex-col w-full">
            {field.label}
            <input
              type={field.type}
              value={formData[field.name] || ""}
              name={field.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
              className="p-2 bg-accent border-base-300 rounded-lg outline-none"
            />
          </label>
        );
      default:
        return null;
    }
  });

  return (
    <div className="container flex flex-col items-center justify-center h-[800px] p-4 mx-auto py-8 bg-transparent">
      <form
        onSubmit={handleSubmitForm}
        className="container w-[500px] mx-auto p-6 flex flex-col space-x-1 gap-4 justify-center items-center bg-base-100 border-base-300 shadow-2xl rounded-lg text-base-content"
      >
        {InputFields}
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <button type="submit" disabled={isLoading} className="btn btn-accent p-4">
            {isLoading ? loadingText : submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
