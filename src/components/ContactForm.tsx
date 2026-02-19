'use client';

import React, { useState, FormEvent, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import DotGrid from './DotGrid';
import './ContactForm.css';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactForm({ isEmbedded = false }: { isEmbedded?: boolean }) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            if (formRef.current) {
                await emailjs.sendForm(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
                    formRef.current,
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
                );
                console.log('Form submitted successfully');
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Reset success message after 3 seconds
                setTimeout(() => setSubmitStatus('idle'), 3000);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const Component = isEmbedded ? "div" : "section";
    const className = isEmbedded ? "w-full py-24 flex justify-center" : "contact-section";

    return (
        <Component id="contact-me" className={className}>
            {/* Background Animation - Only show if NOT embedded */}
            {!isEmbedded && (
                <div className="absolute inset-0 z-0">
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#271E37"
                        activeColor="#5227FF"
                        proximity={120}
                        shockRadius={250}
                        shockStrength={5}
                        resistance={750}
                        returnDuration={1.5}
                    />
                </div>
            )}

            <div className={`${isEmbedded ? 'w-full max-w-4xl flex flex-col items-center justify-center' : 'contact-container'} relative z-10`}>
                {/* Contact Form Wrapper - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="contact-form-wrapper"
                >
                    <h2 className="text-4xl font-bold tracking-tighter text-white md:text-6xl font-display mb-12 text-center uppercase">Contact</h2>

                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="What's your name?"
                                className={`form-input ${errors.name ? 'error' : ''}`}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="What's your email?"
                                className={`form-input ${errors.email ? 'error' : ''}`}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="What do you want to say?"
                                rows={8}
                                className={`form-textarea ${errors.message ? 'error' : ''}`}
                            />
                            {errors.message && <span className="error-message">{errors.message}</span>}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="submit-button"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>

                        {submitStatus === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="success-message"
                            >
                                ✓ Message sent successfully!
                            </motion.p>
                        )}

                        {submitStatus === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="error-message"
                            >
                                ✗ Something went wrong. Please try again.
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </div>
        </Component>
    );
}
