import { useState } from 'react';
import Select from 'react-select';
import axios from "axios"
import Button from "@/components/shared/Button";

const EntryForm = ({ fields, modelName }) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e, fieldName) => {
        const value = e?.target?.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem("authToken")
            await axios.post(`/api/models/${modelName.toLowerCase()}/create`, formData,
                { headers: { Authorization: `Bearer ${authToken}` } })

            setError('')
            setSuccess("Entry created successfully")
        } catch (e) {
            setSuccess('')
            setError(e?.response?.data?.error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-auto mx-w-md">
            {Object.entries(fields).map(([fieldName, fieldData]) => (
                <div key={fieldName} className="mb-4">
                    <label htmlFor={fieldName} className="block mb-2">
                        {fieldName}:
                    </label>
                    {fieldData.type === 'enum' ? (
                        <Select
                            className="text-black"
                            id={fieldName}
                            name={fieldName}
                            options={fieldData.values.map((value) => ({ value, label: value }))}
                            onChange={(selectedOption) => handleChange({ target: selectedOption  }, fieldName)}
                        />
                    ) : (
                        <input
                            className="w-full text-black p-2 text-base"
                            type={fieldData.type === "boolean" ? "checkbox" : "text"}
                            id={fieldName}
                            name={fieldName}
                            required={fieldData.required}
                            onChange={(e) => handleChange(e, fieldName)}
                        />
                    )}
                </div>
            ))}

            {error ? (
                <p className="flex justify-center mt-6 font-sans text-sm text-red-400 antialiased font-light leading-normal text-inherit">
                    {error}
                </p>
            ) : null}

            {success ? (
                <p className="flex justify-center mt-6 font-sans text-sm text-green-500 antialiased font-light leading-normal text-inherit">
                    {success}
                </p>
            ) : null}
            <Button type="submit" className="bg-green-500 hover:bg-green-600">Submit</Button>
        </form>
    );
};

export default EntryForm;
