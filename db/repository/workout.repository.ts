import * as SQLite from 'expo-sqlite';
import {Workout} from "@/domain/workout";
import {UUID} from "crypto";

export default class WorkoutRepository {
    constructor(private readonly db: SQLite.SQLiteDatabase) {
    }

    async getAllWorkouts(): Promise<Workout[]> {
        try {
            return await this.db.getAllAsync<Workout>(`SELECT *
                                                       FROM workouts`);
        } catch (e) {
            console.error("Error getting all workouts:", e);
            throw new Error('Error during getAllWorkouts');
        }
    }

    async getWorkoutById(id: UUID): Promise<Workout> {
        try {
            const workout = await this.db.getFirstSync<Workout>(`SELECT *
                                                                 FROM workouts
                                                                 WHERE id = ?`, [id]);
            if (workout) {
                return workout;
            } else {
                throw new Error('Workout not found');
            }
        } catch (e) {
            console.error("Error getting workout by id:", e);
            throw new Error('Error during getWorkoutsById');
        }
    }

    async insertWorkout(workout: Workout) {
        const {
            id,
            type,
            date,
            duration,
            tags,
            feeling,
            energyLevel,
            motivationLevel,
            stressLevel,
            sleepQuality,
            injuries,
            focusOfTheDay,
            achievedGoal,
            sparringRounds,
            notes,
        } = workout;


        try {
            await this.db.runAsync(
                `INSERT INTO workouts (id, type, date, duration, tags, feeling,
                                       energyLevel, motivationLevel, stressLevel, sleepQuality,
                                       injuries, focusOfTheDay, achievedGoal, sparringRounds, notes)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                id,
                type,
                date,
                duration,
                JSON.stringify(tags),
                feeling,
                energyLevel ?? null,
                motivationLevel ?? null,
                stressLevel ?? null,
                sleepQuality ?? null,
                JSON.stringify(injuries ?? []),
                focusOfTheDay ?? null,
                achievedGoal ? 1 : 0,
                JSON.stringify(sparringRounds ?? []),
                notes ?? null,
            );
        } catch (e) {
            console.error(e);
            return new Error('Error during insertWorkout');
        }
    }

}