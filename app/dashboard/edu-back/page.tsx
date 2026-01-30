'use client';

import { useState } from 'react';

export default function EduBackPage() {
    const [education, setEducation] = useState([
        {
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            current: false,
        },
    ]);

    const addEducation = () => {
        setEducation([
            ...education,
            {
                institution: '',
                degree: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                current: false,
            },
        ]);
    };

    const removeEducation = (index: number) => {
        const list = [...education];
        list.splice(index, 1);
        setEducation(list);
    };

    const handleChange = (e: any, index: number) => {
        const { name, value, checked, type } = e.target;
        const list = [...education] as any;
        list[index][name] = type === 'checkbox' ? checked : value;
        setEducation(list);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would save to the user profile or separate education collection
        console.log('Saving education:', education);
        alert('This feature is coming soon!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Educational Background
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Add your educational history to complete your profile
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="pb-8 border-b border-gray-200 last:border-0"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Education #{index + 1}
                                    </h3>
                                    {education.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeEducation(index)}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Institution Name
                                        </label>
                                        <input
                                            type="text"
                                            name="institution"
                                            value={edu.institution}
                                            onChange={(e) => handleChange(e, index)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border px-4 py-2"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Degree
                                        </label>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={edu.degree}
                                            onChange={(e) => handleChange(e, index)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border px-4 py-2"
                                            placeholder="e.g. Bachelor's"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Field of Study
                                        </label>
                                        <input
                                            type="text"
                                            name="fieldOfStudy"
                                            value={edu.fieldOfStudy}
                                            onChange={(e) => handleChange(e, index)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border px-4 py-2"
                                            placeholder="e.g. Computer Science"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={edu.startDate}
                                            onChange={(e) => handleChange(e, index)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border px-4 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={edu.endDate}
                                            onChange={(e) => handleChange(e, index)}
                                            disabled={edu.current}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border px-4 py-2 disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="current"
                                                checked={edu.current}
                                                onChange={(e) => handleChange(e, index)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">
                                                I am currently studying here
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={addEducation}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Another
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Education
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
