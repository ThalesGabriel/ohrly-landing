"use client";

import Audience from "@/components/audience";
import CTA from "@/components/cta";
import Hero from "@/components/hero";
import Navbar from "@/components/toolbar";
import Problem from "@/components/problem";
import { useState } from "react";
import Thanks from "./thanks";

export default function Main() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);

        const res = await fetch("https://formspree.io/f/mkoygpnk", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: form,
        });

        setLoading(false);

        if (res.ok) {
            setSuccess(true);
        }
    }

    return (
        <main>
            {!success ? (
                <>
                    <Navbar />
                    <Hero />
                    <Problem />
                    <Audience />
                    <CTA loading={loading} submit={handleSubmit}/>
                </>) : (
                <>
                    <Thanks />
                </>
            )}
        </main>
    );
}
