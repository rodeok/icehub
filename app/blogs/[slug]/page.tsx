import { notFound } from "next/navigation";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    await connectDB();
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    let blog = null;
    if (mongoose.isValidObjectId(slug)) {
        blog = await Blog.findById(slug);
    }

    if (!blog) {
        blog = await Blog.findOne({ slug });
    }

    if (!blog) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen flex flex-col pt-8">
            {/* <Navbar /> */}
            <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                <Link href="/blogs" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-8 font-medium transition-colors">
                    <ArrowLeft size={16} /> Back to Blogs
                </Link>

                <article>
                    <div className="mb-8">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-4 ${blog.tagColor}`}>
                            {blog.tag}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-6 text-slate-500 text-sm font-medium border-y border-slate-100 py-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {blog.date}
                            </div>
                            {blog.author && (
                                <div className="flex items-center gap-2">
                                    <FileText size={16} />
                                    By {blog.author}
                                </div>
                            )}
                        </div>
                    </div>

                    {blog.imageUrl && (
                        <div className="w-full aspect-video relative rounded-3xl overflow-hidden mb-12 shadow-lg border border-slate-100">
                            <Image
                                src={blog.imageUrl}
                                alt={blog.title}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-loose">
                        {blog.content.split('\n').map((paragraph: string, index: number) => (
                            <p key={index} className="mb-6">{paragraph}</p>
                        ))}
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
