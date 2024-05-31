import { useState } from 'react';
import Checkbox from "@/components/shared/Checkbox";
import { DATA_TYPES } from "@/components/pages/CreateModelPage/consts";
import Select from 'react-select'
import axios from "axios";
import { capitalizeFirstLetter } from "@/utils/strings";
import Button from "@/components/shared/Button";
import Link from "next/link";

const CreateModelPage = ({ models }) => {
  const [modelName, setModelName] = useState('');
  const [attributes, setAttributes] = useState([{ id: 1, name: '', type: 'string', required: false }]);
  const [error, setError] = useState("")

  const handleAddAttribute = () => {
    setAttributes((prev) => ([...prev, { id: prev[prev.length - 1]?.id + 1 || 1, name: '', type: 'string', required: false }]));
  };

  const handleDeleteAttribute = (id) => {
    const filteredAttributes = attributes.filter(attribute => attribute.id !== id)

    setAttributes(filteredAttributes)
  }

  const handleChangeAttribute = (index, field, value) => {
    const updatedAttributes = [...attributes];
    if(field === "reference") {
      updatedAttributes[index].reference = { model: value }
    } else {
      updatedAttributes[index][field] = value;
    }
    setAttributes(updatedAttributes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fields = {}

      attributes.map(attribute => {
        const { id, name, ...rest } = attribute
        fields[name] = { ...rest }
      })

      const authToken = localStorage.getItem("authToken")


      await axios.post("/api/models/create", { fields, name: capitalizeFirstLetter(modelName) }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      setModelName("")
      setAttributes([{ id: 1, name: '', type: 'string', required: false }])
      setError("")
    } catch (e) {
        setError(e.response?.data?.error)
    }
  };

  const modelOptions = models.map(model => ({ label: model, value: model }))

  return (
      <section className="h-screen bg-slate-800 text-gray-300">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Create Model</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="modelName" className="block font-semibold mb-1">Model Name:</label>
              <input
                  type="text"
                  id="modelName"
                  className="border rounded-md px-3 py-2 w-full text-black"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Fields:</h2>
            {attributes.map((attribute, index) => (
                <div key={index} className="mb-4">
                  <input
                      type="text"
                      className="border rounded-md px-3 py-2 w-1/3 mr-2 text-black"
                      placeholder="Field Name"
                      value={attribute.name}
                      onChange={(e) => handleChangeAttribute(index, 'name', e.target.value)}
                  />
                  <Select
                      className="text-black relative inline-block"
                    defaultValue="string"
                    value={DATA_TYPES.find(item => item.value === attribute.type)}
                    options={DATA_TYPES}
                    onChange={(selectedOption) => handleChangeAttribute(index, 'type', selectedOption.value)}
                  />
                  <Checkbox labelClassName="text-gray-300" label="Required" onChange={(e) => handleChangeAttribute(index, 'required', e.target.checked)} />
                  <Checkbox labelClassName="text-gray-300" label="Unique" onChange={(e) => handleChangeAttribute(index, 'unique', e.target.checked)} />

                  {attribute.type === "enum" && (
                      <textarea
                          className="border resize-y rounded-md px-3 py-2 w-1/5 ml-4 relative top-1/2  text-black"
                          placeholder={`value1 \nvalue2 \nvalue3`}
                          value={attribute.values?.join("\n")}
                          onChange={(e) => handleChangeAttribute(index, 'values', e.target.value.split("\n"))}
                      />
                  )}


                  <div className="mx-4 inline">
                    <span className="text-base font-semibold mr-2 relative -top-0.5">Reference</span>
                    <Select
                        className="text-black relative inline-block"
                        defaultValue="string"
                        value={modelOptions.find(item => item.value === attribute.reference?.model)}
                        options={modelOptions}
                        onChange={(selectedOption) => handleChangeAttribute(index, 'reference', selectedOption.value)}
                    />
                  </div>

                  <button type="button" className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md" onClick={() => handleDeleteAttribute(attribute.id)}>Delete field</button>
                </div>
            ))}
            {error ? (
                <p className="flex justify-center mt-6 font-sans text-sm text-red-400 antialiased font-light leading-normal text-inherit">
                  {error}
                </p>
            ) : null}
            <Button type="button" className="bg-blue-500 hover:bg-blue-600" onClick={handleAddAttribute}>Add Attribute</Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 ml-2">Create Model</Button>
            <Link href="/">
              <Button className="block bg-teal-400 hover:bg-teal-500 mt-4">{"<-- Back Home"}</Button>
            </Link>
          </form>
        </div>
      </section>
  );
};

export default CreateModelPage;
