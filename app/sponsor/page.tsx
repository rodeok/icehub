"use client";

import React, { useState } from 'react';

export default function SponsorPage() {
    const [supportType, setSupportType] = useState('full');
    const [hasCandidate, setHasCandidate] = useState('yes');
    const [specificCourse, setSpecificCourse] = useState('no');
    const [donationMethod, setDonationMethod] = useState('bank');
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/sponsor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    hasCandidate,
                    specificCourse,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
            // Reset form
            setFormData({ name: '', email: '', phone: '', message: '' });
            setHasCandidate('yes');
            setSpecificCourse('no');

        } catch (error: any) {
            setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafb] font-sans pb-10 md:pb-20 overflow-x-hidden">
            <div className="max-w-[1300px] mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                {/* Left Column */}
                <div className="flex flex-col xl:pr-8">
                    <h1 className="text-[30px] md:text-[42px] lg:text-[50px] font-extrabold text-[#333333] leading-[1.1] mb-5">
                        <span className="text-[#3ebdf8]">Join</span> our <span className="text-[#3ebdf8]">cause</span> in <br className="hidden md:block" />
                        shaping the future of <br className="hidden md:block" />
                        <span className="text-[#3ebdf8]">tech education</span>
                    </h1>
                    <p className="text-[#555555] text-lg font-semibold mb-3">
                        We are always available to follow up on your concerns and inquiries
                    </p>
                    <div className="mb-10 inline-block relative mt-2">
                        <div className="absolute -top-3 -right-6 animate-bounce bg-[#ff5a5f] text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-lg z-10 whitespace-nowrap">
                            Chat Now! 💬
                        </div>
                        <button
                            onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }}
                            className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#3ebdf8] to-[#1da2e0] text-white px-5 py-2.5 rounded-full font-semibold text-[14px] shadow-[0_6px_16px_-6px_rgba(62,189,248,0.6)] hover:shadow-[0_10px_20px_-6px_rgba(62,189,248,0.7)] hover:-translate-y-1 transition-all duration-300 focus:outline-none overflow-hidden"
                        >
                            <span className="absolute flex h-full w-full inset-0 rounded-full group-hover:animate-ping opacity-20 bg-white duration-1000"></span>

                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 relative z-10 animate-pulse"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>

                            <span className="relative z-10">Learn More</span>
                        </button>
                    </div>

                    <div className="w-full relative shadow-sm h-auto">
                        <img
                            src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Student"
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                </div>

                {/* Right Column (Form Box) */}
                <div className="bg-white rounded-2xl shadow-[0_4px_35px_rgb(0,0,0,0.06)] p-6 md:p-8 border border-gray-100 mt-2 lg:mt-0">

                    <div className="border border-gray-200 rounded-[20px] p-5 mb-8">
                        <h2 className="text-[#646464] text-[22px] font-bold mb-5">How do you wish to support students</h2>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Option 1 */}
                            <label
                                className={`flex items-center p-3.5 border rounded-lg cursor-pointer flex-1 transition-all duration-200 ${supportType === 'any' ? 'border-[#3ebdf8] bg-[#dff0fa]' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setSupportType('any')}
                            >
                                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${supportType === 'any' ? 'border-[#1e293b]' : 'border-gray-400'
                                    }`}>
                                    {supportType === 'any' && <div className="w-[8px] h-[8px] rounded-full bg-[#1e293b]" />}
                                </div>
                                <span className={`font-semibold text-[14px] ${supportType === 'any' ? 'text-gray-800' : 'text-[#a1a1a1]'}`}>Donate any amount</span>
                            </label>

                            {/* Option 2 */}
                            <label
                                className={`flex items-center p-3.5 border rounded-lg cursor-pointer flex-1 transition-all duration-200 ${supportType === 'full' ? 'border-[#3ebdf8] bg-[#bde8ff]' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setSupportType('full')}
                            >
                                <div className={`w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center mr-3 flex-shrink-0 ${supportType === 'full' ? 'border-[#0b2b36]' : 'border-gray-400'
                                    }`}>
                                    {supportType === 'full' && <div className="w-[8px] h-[8px] rounded-full bg-[#0b2b36]" />}
                                </div>
                                <span className={`font-bold text-[14px] ${supportType === 'full' ? 'text-gray-900' : 'text-[#a1a1a1]'}`}>Help a student with full scholarship</span>
                            </label>
                        </div>
                    </div>

                    {supportType === 'full' ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Form Status Message */}
                            {submitStatus.type && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                                    }`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            {/* Name */}
                            <div>
                                <label className="block mb-2">
                                    <span className="text-[#6c6c6c] font-bold text-[15px]">Name</span>
                                    <span className="text-[#b4b4b4] text-[13px] ml-2 font-medium tracking-tight">(Please use your organization name if you are an organization)</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Eg .James Victoriaa"
                                    className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#3ebdf8] focus:border-[#3ebdf8] text-gray-700 placeholder-[#d1d1d1] transition-colors"
                                />
                            </div>

                            {/* Email and Phone */}
                            <div className="flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-[#6c6c6c] font-bold text-[15px]">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Eg .JamesVictoriaa@gmail.com"
                                        className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#3ebdf8] focus:border-[#3ebdf8] text-gray-700 placeholder-[#d1d1d1] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#6c6c6c] font-bold text-[15px]">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Eg . 09023455678"
                                        className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#3ebdf8] focus:border-[#3ebdf8] text-gray-700 placeholder-[#d1d1d1] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Candidate Sponsor */}
                            <div>
                                <label className="block mb-3 text-[#6c6c6c] font-bold text-[15px]">Do you have a candidate you wish to sponsor</label>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <button
                                        type="button"
                                        onClick={() => setHasCandidate('yes')}
                                        className={`flex-1 flex items-center justify-center py-2.5 border rounded-lg transition-all duration-200 ${hasCandidate === 'yes' ? 'border-[#3ebdf8] bg-[#aee2ff]' : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center mr-2 flex-shrink-0 ${hasCandidate === 'yes' ? 'border-[#0a232b]' : 'border-[#9a9a9a]'
                                            }`}>
                                            {hasCandidate === 'yes' && <div className="w-[7px] h-[7px] rounded-full bg-[#081e26]" />}
                                        </div>
                                        <span className={`text-[14px] font-bold ${hasCandidate === 'yes' ? 'text-gray-900' : 'text-[#afafaf]'}`}>Yes</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setHasCandidate('no')}
                                        className={`flex-1 flex items-center justify-center py-2.5 border rounded-lg transition-all duration-200 ${hasCandidate === 'no' ? 'border-[#3ebdf8] bg-[#aee2ff]' : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center mr-2 flex-shrink-0 ${hasCandidate === 'no' ? 'border-[#0a232b]' : 'border-[#9a9a9a]'
                                            }`}>
                                            {hasCandidate === 'no' && <div className="w-[7px] h-[7px] rounded-full bg-[#081e26]" />}
                                        </div>
                                        <span className={`text-[14px] font-bold ${hasCandidate === 'no' ? 'text-gray-900' : 'text-[#afafaf]'}`}>No</span>
                                    </button>
                                </div>
                            </div>

                            {/* Specific Course */}
                            <div>
                                <label className="block mb-3 text-[#6c6c6c] font-bold text-[15px]">Is there a specific course you would like to sponsor a student in ?</label>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <button
                                        type="button"
                                        onClick={() => setSpecificCourse('yes')}
                                        className={`flex-1 flex items-center justify-center py-2.5 border rounded-lg transition-all duration-200 ${specificCourse === 'yes' ? 'border-[#3ebdf8] bg-[#aee2ff]' : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center mr-2 flex-shrink-0 ${specificCourse === 'yes' ? 'border-[#0a232b]' : 'border-[#9a9a9a]'
                                            }`}>
                                            {specificCourse === 'yes' && <div className="w-[7px] h-[7px] rounded-full bg-[#081e26]" />}
                                        </div>
                                        <span className={`text-[14px] font-bold ${specificCourse === 'yes' ? 'text-gray-900' : 'text-[#afafaf]'}`}>Yes</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSpecificCourse('no')}
                                        className={`flex-1 flex items-center justify-center py-2.5 border rounded-lg transition-all duration-200 ${specificCourse === 'no' ? 'border-[#3ebdf8] bg-[#aee2ff]' : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center mr-2 flex-shrink-0 ${specificCourse === 'no' ? 'border-[#0a232b]' : 'border-[#9a9a9a]'
                                            }`}>
                                            {specificCourse === 'no' && <div className="w-[7px] h-[7px] rounded-full bg-[#081e26]" />}
                                        </div>
                                        <span className={`text-[14px] font-bold ${specificCourse === 'no' ? 'text-gray-900' : 'text-[#afafaf]'}`}>No</span>
                                    </button>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="pt-2">
                                <label className="block mb-2">
                                    <span className="text-[#6c6c6c] font-bold text-[15px]">Message</span>
                                    <span className="text-[#b4b4b4] text-[13px] ml-1.5 font-medium">(optional)</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Type your message here"
                                    rows={5}
                                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#3ebdf8] focus:border-[#3ebdf8] text-gray-700 placeholder-[#d1d1d1] transition-colors resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-5 pb-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full font-medium text-[17px] py-4 rounded-xl transition-colors shadow-sm flex justify-center items-center ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3abef8] hover:bg-[#2faee8] text-white'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </div>

                        </form>
                    ) : (
                        <div className="space-y-8">
                            {/* Tabs */}
                            <div className="flex flex-col sm:flex-row border-b border-gray-200">
                                <button
                                    onClick={() => setDonationMethod('bank')}
                                    className={`flex-1 text-center py-3 font-bold text-[16px] transition-colors ${donationMethod === 'bank' ? 'text-[#3ebdf8] border-b-[3px] border-[#3ebdf8]' : 'text-[#9a9a9a] hover:text-[#646464]'
                                        }`}
                                >
                                    Direct Bank transfer
                                </button>
                                <button
                                    onClick={() => setDonationMethod('card')}
                                    className={`flex-1 text-center py-3 font-bold text-[16px] transition-colors ${donationMethod === 'card' ? 'text-[#3ebdf8] border-b-[3px] border-[#3ebdf8]' : 'text-[#9a9a9a] hover:text-[#646464]'
                                        }`}
                                >
                                    Donate with card
                                </button>
                            </div>

                            {donationMethod === 'bank' ? (
                                <div className="space-y-6 pt-4 px-2">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[#6c6c6c] text-[16px] font-medium">Account type</span>
                                        <span className="text-[#646464] text-[16px] font-medium">Current</span>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[#6c6c6c] text-[16px] font-medium">Account Name</span>
                                        <span className="text-[#646464] text-[16px] font-medium">IceHub Entrepries</span>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[#6c6c6c] text-[16px] font-medium">Bank Name</span>
                                        <span className="text-[#646464] text-[16px] font-medium">Guaranty Trust Bank</span>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[#6c6c6c] text-[16px] font-medium">Account Number</span>
                                        <span className="text-[#646464] text-[16px] font-medium">0523419216</span>
                                    </div>

                                    <div className="bg-[#f5f5f5] rounded-xl p-6 mt-8">
                                        <h3 className="text-[#333333] font-bold text-[16px] mb-2">Note</h3>
                                        <p className="text-[#999999] text-[15px] leading-relaxed">
                                            Please include a narration and your full name for each support payment made for easy doocumentation
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-10 text-center text-gray-500">
                                    Card payment integration coming soon.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Section */}
            {supportType === 'any' && (
                <div className="w-full flex justify-center pb-10 md:pb-20 mt-12 md:mt-20">
                    <div className="max-w-[1000px] w-full px-4 sm:px-6 md:px-8">
                        <div className="bg-[#f5f5f5] rounded-[24px] md:rounded-[32px] p-6 md:p-12">
                            <h2 className="text-[#646464] text-[18px] md:text-[22px] font-bold text-center mb-6 md:mb-10 px-2 lg:px-0">
                                Contact Us for more on collaborations and support
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Message us */}
                                <div className="bg-white rounded-[32px] p-8 flex flex-col items-center justify-center shadow-sm text-center transform transition-transform hover:-translate-y-1">
                                    <div className="w-[72px] h-[72px] rounded-full bg-[#dff0fa] flex items-center justify-center mb-5 text-[#3abef8]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[#333333] font-bold text-[20px] mb-2">Message us</h3>
                                    <p className="text-[#888888] text-[16px]">support@icehub-ng.com</p>
                                </div>

                                {/* Call us */}
                                <div className="bg-white rounded-[32px] p-8 flex flex-col items-center justify-center shadow-sm text-center transform transition-transform hover:-translate-y-1">
                                    <div className="w-[72px] h-[72px] rounded-full bg-[#dff0fa] flex items-center justify-center mb-5 text-[#3abef8]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[#333333] font-bold text-[20px] mb-2">Call us</h3>
                                    <p className="text-[#888888] text-[16px]">(+61) 7 7010-1111</p>
                                </div>

                                {/* Address */}
                                <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-center shadow-sm text-center transform transition-transform hover:-translate-y-1">
                                    <div className="w-[72px] h-[72px] rounded-full bg-[#dff0fa] flex items-center justify-center mb-5 text-[#3abef8]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[#333333] font-bold text-[20px] mb-2">Address</h3>
                                    <p className="text-[#888888] text-[16px]">No. 290 Old Onitsha Road, Bethel Building,
                                        Uruagu, Nnewi, Anambra State</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Modal */}
            {isChatOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden relative animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3ebdf8]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                                Support Chat
                            </h3>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* IFrame */}
                        <div className="flex-1 bg-gray-50">
                            <iframe
                                src="https://icebot11.vercel.app/"
                                className="w-full h-full border-none"
                                title="IceHub Chat"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
