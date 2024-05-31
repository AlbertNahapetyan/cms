import React from 'react';

const DynamicForm = ({ data, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        onSubmit(formDataObject);
    };

    const fields = Object.keys(data)
        .filter(key => !['id', 'createdAt', 'updatedAt'].includes(key))
        .map((key) => ({
            id: key,
            label: key,
            type: 'text',
            value: data[key]
        }));

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {fields.map((field) => (
                <div key={field.id} className="flex flex-col">
                    <label htmlFor={field.id} className="font-semibold">{field.label}</label>
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        className="border border-gray-300 rounded-md p-2 text-black"
                        defaultValue={field.value || ''}
                    />
                </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                Submit
            </button>
        </form>
    );
};

export default DynamicForm;
