import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout } from "@/domain/workout";
import { getDBConnection } from "@/db/database";
import { RootState } from "@/store/store";

interface WorkoutsState {
    workouts: Workout[];
    loading: boolean;
    error?: string;
}

const initialState: WorkoutsState = {
    workouts: [],
    loading: false,
};

const parseJSONSafely = <T>(value: unknown, fallback: T): T => {
    if (typeof value === 'string') {
        try {
            return JSON.parse(value) as T;
        } catch {
            return fallback;
        }
    }
    if (typeof value === 'object' && value !== null) {
        return value as T;
    }
    return fallback;
};

export const loadWorkouts = createAsyncThunk('workouts/load', async () => {
    const db = await getDBConnection();
    const result = await db.getAllAsync<Workout>(`SELECT * FROM workouts`);
    return result.map((w) => ({
        ...w,
        date: w.date,
        tags: parseJSONSafely<string[]>(w.tags, []),
        injuries: parseJSONSafely<string[]>(w.injuries, []),
        sparringRounds: parseJSONSafely<Workout['sparringRounds']>(w.sparringRounds, []),
    }));
});

// Sélecteur corrigé : prend state ET id en paramètre
export const selectWorkoutById = (state: RootState, id: string): Workout | undefined => {
    return state.workouts.workouts.find(w => w.id === id);
}

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        addWorkout: (state, action: PayloadAction<Workout>) => {
            state.workouts.unshift(action.payload);
        },
        // update/delete à ajouter ici si besoin
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWorkouts.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadWorkouts.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts = action.payload;
            })
            .addCase(loadWorkouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addWorkout } = workoutsSlice.actions;

export default workoutsSlice.reducer;
