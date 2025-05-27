import { useState, type ChangeEvent } from "react";

export type Field = {
    name: string;
    label: string;
    type: "text" | "password" | "email";
}

type InputProps = {
    fields: Field[];
    handleSubmit: (data: Record<string, string>) => Promise<void>;
    initialData: Record<string, string>;
    submitText: string;
    loadingText: string;
    error: string | null;
}

const Input = ({ fields, handleSubmit, initialData, submitText, loadingText, error }: InputProps) => {
    const [formData, setFormData] = useState<Record<string, string>>({...initialData});
    const [isLoading, setIsLoading] = useState(false);

  
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        handleSubmit(formData).finally(() => setIsLoading(false));
    };

    const InputFields = fields.map((field) => {
        switch (field.type) {
            case 'text':
            case 'password':
            case 'email':
                return (
                    <label key={field.name} >
                        {field.label}
                        <input type={field.type} value={formData[field.name] || ''} name={field.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [field.name]: e.target.value})} className="bg-accent border-base-300 rounded-lg"/>
                    </label>
                );
            default:
                return null;
        }
    });

    return (
        <div className="container p-4 mx-auto py-8 bg-base-200">
            <form onSubmit={handleSubmitForm} className="flex flex-col space-x-1 gap-2 justify-center items-center bg-base-100 border-base-300 text-base-content">
                {InputFields}
                {error && (<div className="text-red-500">{error}</div>)}
                <div>
                    <button type="submit" disabled={isLoading} className="bg-neutral-100">
                        {isLoading ? loadingText : submitText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Input;
