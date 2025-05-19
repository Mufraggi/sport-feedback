import { z } from "zod";

export const workoutSchema = z.object({
    type: z.enum(["JJB GI", "JJB NO GI", "GRAPPLING"]),
    date: z.string().min(1, "Date requise").default(new Date().toISOString()),
    duration: z.number().min(1, "Durée minimale 1 minute"),
    tags: z.array(z.string()).optional(),
    feeling: z.number().min(1).max(10),
    energyLevel: z.number().min(1).max(10).optional(),
    motivationLevel: z.number().min(1).max(10).optional(),
    stressLevel: z.number().min(1).max(10).optional(),
    sleepQuality: z.number().min(1).max(10).optional(),
    injuries: z.array(z.string()).optional(),
    focusOfTheDay: z.string().optional(),
    achievedGoal: z.boolean().optional(),
    sparringRounds: z
        .array(
            z.object({
                partner: z.string().min(1),
                outcome: z.enum(["win", "lose", "draw", "unknown"]),
                notes: z.string().optional(),
            })
        )
        .optional(),
    notes: z.string().optional(),
});
export type WorkoutFormValues = z.infer<typeof workoutSchema>;
