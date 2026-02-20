'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const partners = [
    {
        name: 'Solution Innovation District',
        src: '/images/solu.png',
        width: 180,
        height: 60,
    },
    {
        name: 'Partner 2',
        src: '/images/null.png',
        width: 180,
        height: 70,
    },
    {
        name: 'ISN Hubs',
        src: '/images/isn.png',
        width: 140,
        height: 60,
    },
    {
        name: 'UNDP',
        src: '/images/undp.png',
        width: 140,
        height: 60,
    },
    {
        name: 'Google',
        src: '/images/google.png',
        width: 180,
        height: 40,
    },
];

export default function Partners() {
    return (
        <section className="w-full bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold !text-black">
                    Our <span className="text-blue-600">Partners</span>
                </h2>

                {/* Subtitle */}
                <p className="mt-4 max-w-2xl mx-auto !text-black">
                    Collaborating with leading organizations to provide world-class
                    training and opportunities
                </p>

                {/* Logos */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-5 items-center gap-y-12 gap-x-8">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            className="flex justify-center items-center cursor-pointer gpu"
                            whileHover={{
                                scale: 1.1,
                                filter: "brightness(1.1)",
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            <Image
                                src={partner.src}
                                alt={partner.name}
                                width={partner.width}
                                height={partner.height}
                                className="object-contain"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
