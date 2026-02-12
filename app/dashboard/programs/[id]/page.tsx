import connectDB from '@/lib/mongodb';
import Program from '@/models/Program';
import ProgramView from '@/components/ProgramView';
import { notFound } from 'next/navigation';

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    // Use .lean() to get a plain JavaScript object
    const program = await Program.findById(id).lean();

    if (!program) {
        notFound();
    }

    // Convert _id and other ObjectIds to string to avoid serialization issues
    const serializedProgram = JSON.parse(JSON.stringify(program));

    return <ProgramView program={serializedProgram} />;
}

