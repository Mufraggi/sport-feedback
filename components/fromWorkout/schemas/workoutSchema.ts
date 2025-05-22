import {z} from "zod";

export const workoutSchema = z.object({
    type: z.enum(["JJB GI", "JJB NO GI", "GRAPPLING"]),
    date: z.date(),
    duration: z.number().min(1, "Durée minimale 1 minute"),
    tags: z.array(z.string()).optional(),
    feeling: z.number().min(1).max(10),
    energyLevel: z.number().min(1).max(10),
    motivationLevel: z.number().min(1).max(10),
    stressLevel: z.number().min(1).max(10),
    sleepQuality: z.number().min(1).max(10),
    injuries: z.array(z.string()),
    focusOfTheDay: z.string().optional(),
    achievedGoal: z.boolean().optional(),
    notes: z.string().optional(),
});
export type WorkoutFormValues = z.infer<typeof workoutSchema>;
