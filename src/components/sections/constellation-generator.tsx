"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { runConstellationGenerator } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import Image from 'next/image';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
    portfolioDetails: z.string().min(50, {
        message: 'Please provide at least 50 characters to create a meaningful constellation.'
    }).max(500, {
        message: 'Please keep your description under 500 characters.'
    }),
});

export default function ConstellationGenerator() {
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            portfolioDetails: '',
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
                description: "Your personalized constellation has been generated.",
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error Generating Image',
                description: result.error || 'An unexpected error occurred. Please try again.',
            });
        }
    }
    
    return (
        <section id="generator" className="py-20 px-4 container">
            <h2 className="text-4xl font-bold text-center font-headline mb-4">AI Constellation Generator</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Describe your portfolio, experience, or passions, and let our AI forge a unique constellation background just for you.
            </p>
            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-accent" />
                        Create Your Cosmos
                    </CardTitle>
                    <CardDescription>Enter your details below to begin the generative process.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="portfolioDetails"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Professional Story</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="e.g., A full-stack developer with 5 years of experience specializing in React and Node.js. Passionate about creating accessible and performant web applications..."
                                                    className="min-h-[200px] resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>The more detail, the more unique your constellation.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading} className="w-full bg-accent-gradient text-accent-foreground font-semibold">
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate Constellation'}
                                </Button>
                            </form>
                        </Form>
                        <div className="w-full aspect-square bg-muted/50 rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/30 overflow-hidden">
                            {isLoading ? (
                                <div className="text-center text-muted-foreground p-4">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
                                    <p className="font-semibold">Generating your cosmos...</p>
                                    <p className="text-sm">This may take a moment.</p>
                                </div>
                            ) : generatedImage ? (
                                <Image src={generatedImage} alt="Generated Constellation" width={500} height={500} className="rounded-lg object-cover w-full h-full transition-opacity duration-500 opacity-0 animate-fade-in" onLoad={(e) => e.currentTarget.style.opacity = '1'}/>
                            ) : (
                                <div className="text-muted-foreground text-center p-4">
                                    <Sparkles className="w-10 h-10 mx-auto mb-4 text-muted-foreground/50"/>
                                    <p>Your generated image will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
