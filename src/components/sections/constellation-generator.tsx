"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { runConstellationGenerator } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }).max(50),
    role: z.string().min(2, { message: 'Role must be at least 2 characters.' }).max(50),
    keySkills: z.string().min(3, { message: 'Please list at least one skill.' }).max(100),
    companyCulture: z.string().min(3, { message: 'Describe the culture in a few words.' }).max(100),
});

export default function ConstellationGenerator() {
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: '',
            role: '',
            keySkills: '',
            companyCulture: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setGeneratedImage(null);
        const result = await runConstellationGenerator(values);
        setIsLoading(false);

        if (result.success && result.data?.constellationImage) {
            setGeneratedImage(result.data.constellationImage);
            toast({
                title: "Success!",
                description: "Your company's constellation has been discovered.",
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error Charting Stars',
                description: result.error || 'An unexpected error occurred. Please try again.',
            });
        }
    }
    
    return (
        <section id="generator" className="py-20 px-4 container">
            <h2 className="text-5xl font-bold text-center font-headline mb-4 text-glow">Recruiter's Constellation</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Have a little fun! Enter some details about a role you're hiring for, and let our AI chart a unique constellation representing your ideal candidate's journey.
            </p>
            <div className="glass-card max-w-4xl mx-auto p-8">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Celestial Innovations" {...field} className="bg-background/50 border-white/20"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role You're Hiring For</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Starship Engineer" {...field} className="bg-background/50 border-white/20"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="keySkills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Key Skills</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., React, Anti-gravity, Lasers" {...field} className="bg-background/50 border-white/20"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companyCulture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Culture</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Collaborative, Innovative, Daring" {...field} className="bg-background/50 border-white/20"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold !mt-6">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Your Company's Constellation</>}
                            </Button>
                        </form>
                    </Form>
                    <div className="w-full aspect-square bg-black/30 rounded-lg flex items-center justify-center border border-dashed border-white/20 overflow-hidden">
                        {isLoading ? (
                            <div className="text-center text-muted-foreground p-4">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
                                <p className="font-semibold">Charting your cosmos...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        ) : generatedImage ? (
                            <Image src={generatedImage} alt="Generated Constellation" width={500} height={500} className="rounded-lg object-cover w-full h-full transition-opacity duration-500 opacity-0 animate-fade-in" onLoad={(e) => e.currentTarget.style.opacity = '1'}/>
                        ) : (
                            <div className="text-muted-foreground text-center p-4">
                                <Sparkles className="w-10 h-10 mx-auto mb-4 text-white/30"/>
                                <p>Your company's constellation will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
