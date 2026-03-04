"use client";

import { useFormStatus, useFormState } from "react-dom";
import { sendEmailAction } from "@/lib/actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
        >
            {pending ? "Sending..." : "Send Message"}
        </button>
    );
}

const initialState = { success: false, error: "" };

export function ContactForm() {
    const [state, formAction] = useFormState(sendEmailAction, initialState);

    if (state.success) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-lg text-emerald-400 text-center">
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. I will get back to you shortly.</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-6">
            {state.error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400">
                    {state.error}
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Your name"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="your@email.com"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                />
            </div>
            <SubmitButton />
            <p className="text-xs text-white/40 text-center">
                This form currently logs output to the server console. Integrate Resend or SendGrid in `lib/actions.ts` for real delivery.
            </p>
        </form>
    );
}
