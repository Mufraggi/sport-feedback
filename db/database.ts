import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';
import {Workout} from "@/domain/workout";
import {UUID} from "crypto";

export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
    return await SQLite.openDatabaseAsync('test.db');
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
    //await db.execAsync('DELETE FROM workouts');

    await db.execAsync(`CREATE TABLE IF NOT EXISTS workouts
                        (
                            id              TEXT PRIMARY KEY NOT NULL,
                            type            TEXT,
                            date            TEXT,
                            duration        INTEGER,
                            tags            TEXT,
                            feeling         INTEGER,
                            energyLevel     INTEGER,
                            motivationLevel INTEGER,
                            stressLevel     INTEGER,
                            sleepQuality    INTEGER,
                            injuries        TEXT,
                            focusOfTheDay   TEXT,
                            achievedGoal    INTEGER,
                            sparringRounds  TEXT,
                            notes           TEXT
                        );`)
};


export const insertSampleWorkouts = async () => {
    const data: Workout[] = [
        {
            id: uuid.v4() as UUID,
            type: "JJB GI",
            date: new Date("2025-05-12"),
            duration: 90,
            tags: ["guard", "pressure"],
            feeling: 8,
            notes: "Bon rythme. J’ai réussi à garder le calme contre un partenaire plus lourd.",
            focusOfTheDay: "garder le calme sous pression",
            energyLevel: 7,
            motivationLevel: 9,
            stressLevel: 3,
            sleepQuality: 8,
            injuries: [],
            achievedGoal: true,
            sparringRounds: [
                {partner: "Léo", outcome: "draw", notes: "Très technique, échanges équilibrés."},
                {partner: "Mathieu", outcome: "lose", notes: "Il m’a pris le dos deux fois."}
            ]
        },
        {
            id: uuid.v4() as UUID,
            type: "JJB NO GI",
            date: new Date("2025-05-10"),
            duration: 75,
            tags: ["leglock", "passing"],
            feeling: 6,
            notes: "Manque de grip, difficile de stabiliser les positions.",
            focusOfTheDay: "contrôler sans kimono",
            energyLevel: 6,
            motivationLevel: 7,
            stressLevel: 4,
            sleepQuality: 5,
            injuries: ["genou gauche"],
            achievedGoal: false,
            sparringRounds: [
                {partner: "Alex", outcome: "win", notes: "Heel hook rapide."}
            ]
        },
        {
            id: uuid.v4() as UUID,
            type: "GRAPPLING",
            date: new Date("2025-05-08"),
            duration: 60,
            tags: ["wrestling", "scramble"],
            feeling: 7,
            notes: "J’ai beaucoup transpiré, très cardio. Bonne résistance mentale.",
            focusOfTheDay: "enchaîner les scrambles",
            energyLevel: 8,
            motivationLevel: 8,
            stressLevel: 2,
            sleepQuality: 7,
            injuries: [],
            achievedGoal: true,
            sparringRounds: [
                {partner: "Nico", outcome: "draw", notes: "Intense mais propre."}
            ]
        },
    ];

    await Promise.all(data.map(insertWorkout));
};
export const insertWorkout = async (workout: Workout) => {
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
    const db = await getDBConnection()


    await db.runAsync(
        `INSERT INTO workouts (id, type, date, duration, tags, feeling,
                               energyLevel, motivationLevel, stressLevel, sleepQuality,
                               injuries, focusOfTheDay, achievedGoal, sparringRounds, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        id,
        type,
        date.toISOString(),
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
}
