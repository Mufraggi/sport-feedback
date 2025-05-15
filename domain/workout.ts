import {UUID} from "crypto";

export type Workout = {
    id: UUID;
    type: "JJB GI" | "JJB NO GI" | "GRAPPLING";
    date: Date;
    duration: number;
    tags: string[];
    feeling: number;
    energyLevel?: number;
    motivationLevel?: number;
    stressLevel?: number;
    sleepQuality?: number;
    injuries?: string[];
    focusOfTheDay?: string;
    achievedGoal?: boolean;
    sparringRounds?: {
        partner: string; // nom ou surnom
        outcome: "win" | "lose" | "draw" | "unknown";
        notes?: string;
    }[];
    notes?: string;
};

export type WorkoutCard = Pick<Workout, "id" | "date" | "type" | "feeling" | "focusOfTheDay" | "duration" | "tags"> & {
    shortNote?: string;
};

export function toWorkoutCard(workout: Workout): WorkoutCard {
    return {
        id: workout.id,
        date: workout.date,
        type: workout.type,
        feeling: workout.feeling,
        focusOfTheDay: workout.focusOfTheDay,
        duration: workout.duration,
        tags: workout.tags,
        shortNote: workout.notes ? workout.notes.slice(0, 100) : undefined, // Exemple: 1ère phrase ou 100 premiers caractères
    };
}