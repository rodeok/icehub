'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Video, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface UploadDropzoneProps {
    onUploadSuccess: (url: string, originalFilename?: string) => void;
    type: 'image' | 'video' | 'pdf' | 'document';
    label: string;
    description?: string;
    currentValue?: string;
    onRemove?: () => void;
    uploadPreset?: string;
}

export default function UploadDropzone({
    onUploadSuccess,
    type,
    label,
    description,
    currentValue,
    onRemove,
    uploadPreset
}: UploadDropzoneProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Use provided prop, env var, or fallback
            const preset = uploadPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'icehub_preset';
            formData.append('upload_preset', preset);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setProgress(Math.round(percentComplete));
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    onUploadSuccess(response.secure_url, response.original_filename);
                    setIsUploading(false);
                } else {
                    const response = JSON.parse(xhr.responseText);
                    setError(response.error?.message || 'Upload failed');
                    setIsUploading(false);
                }
            };

            xhr.onerror = () => {
                setError('Network error');
                setIsUploading(false);
            };

            xhr.send(formData);

        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            setIsUploading(false);
        }
    }, [onUploadSuccess]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: type === 'image'
            ? { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }
            : type === 'video'
                ? { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] }
                : type === 'document'
                    ? {
                        'application/pdf': ['.pdf'],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
                    }
                    : { 'application/pdf': ['.pdf'] },
        multiple: false,
        disabled: isUploading
    });

    const Icon = type === 'image' ? ImageIcon : type === 'video' ? Video : FileText;

    // Hardcode mapped classes instead of dynamic templates so Tailwind v4 parses them correctly
    const STYLES = {
        image: {
            borderOnDrag: 'border-blue-400 bg-blue-50/50',
            bgLight: 'bg-blue-50',
            textMain: 'text-blue-600',
            borderLight: 'border-blue-100',
            stroke: 'stroke-blue-600',
            groupHoverText: 'group-hover:text-blue-600'
        },
        video: {
            borderOnDrag: 'border-purple-400 bg-purple-50/50',
            bgLight: 'bg-purple-50',
            textMain: 'text-purple-600',
            borderLight: 'border-purple-100',
            stroke: 'stroke-purple-600',
            groupHoverText: 'group-hover:text-purple-600'
        },
        document: {
            borderOnDrag: 'border-orange-400 bg-orange-50/50',
            bgLight: 'bg-orange-50',
            textMain: 'text-orange-600',
            borderLight: 'border-orange-100',
            stroke: 'stroke-orange-600',
            groupHoverText: 'group-hover:text-orange-600'
        },
        pdf: {
            borderOnDrag: 'border-green-400 bg-green-50/50',
            bgLight: 'bg-green-50',
            textMain: 'text-green-600',
            borderLight: 'border-green-100',
            stroke: 'stroke-green-600',
            groupHoverText: 'group-hover:text-green-600'
        }
    };

    const styles = STYLES[type];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</label>
                {currentValue && onRemove && !isUploading && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                        <X size={12} /> Remove
                    </button>
                )}
            </div>

            <div
                {...getRootProps()}
                className={`
                    relative border-2 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all min-h-[160px]
                    ${isDragActive ? styles.borderOnDrag : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'}
                    ${isUploading ? 'pointer-events-none' : ''}
                    ${error ? 'border-red-200 bg-red-50/30' : ''}
                `}
            >
                <input {...getInputProps()} />

                {currentValue && !isUploading ? (
                    <div className="w-full h-full flex flex-col items-center gap-3">
                        {type === 'image' ? (
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                <Image src={currentValue} alt="Preview" fill unoptimized className="object-cover" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-gray-900 shadow-xl">
                                        Click to change
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`p-6 bg-white rounded-3xl border shadow-sm flex items-center gap-4 w-full ${styles.borderLight}`}>
                                <div className={`p-3 rounded-xl ${styles.bgLight} ${styles.textMain}`}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-gray-900 truncate">File uploaded successfully</p>
                                    <p className="text-[10px] text-gray-400 font-medium truncate">{currentValue}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : isUploading ? (
                    <div className="flex flex-col items-center gap-4 w-full px-8">
                        <div className="relative h-16 w-16">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                                <circle className="stroke-gray-100" strokeWidth="3" fill="transparent" r="16" cx="18" cy="18" />
                                <circle
                                    className={`transition-all duration-300 ${styles.stroke}`}
                                    strokeWidth="3"
                                    strokeDasharray={`${progress}, 100`}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="16" cx="18" cy="18"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-[10px] font-black ${styles.textMain}`}>{progress}%</span>
                            </div>
                        </div>
                        <p className={`text-xs font-bold animate-pulse ${styles.textMain}`}>Uploading your {type}...</p>
                    </div>
                ) : (
                    <>
                        <div className={`p-4 bg-gray-50 rounded-2xl text-gray-400 transition-colors ${styles.groupHoverText}`}>
                            <Icon size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-900">
                                {isDragActive ? 'Drop it here!' : `Click or drag ${type} here`}
                            </p>
                            {description && (
                                <p className="text-xs text-gray-400 mt-1 font-medium">{description}</p>
                            )}
                        </div>
                    </>
                )}

                {error && (
                    <div className="mt-2 text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
