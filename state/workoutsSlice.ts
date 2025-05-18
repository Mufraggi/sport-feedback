import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Workout} from "@/domain/workout";
import WorkoutRepository from "@/db/repository/workout.repository";
import {UUID} from "crypto";

interface WorkoutsState {
    workouts: Workout[];
    loading: boolean;
    error?: string;
}

const initialState: WorkoutsState = {
    workouts: [],
    loading: false,
};

interface ThunkExtraArgument {
    repository: WorkoutRepository;
}

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

export const loadWorkouts = createAsyncThunk<
    Workout[],
    void,
    { extra: ThunkExtraArgument }
>('workouts/load', async (_, {extra}) => {
    const {repository} = extra;
    const workouts = await repository.getAllWorkouts();
    return workouts.map((w) => ({
        ...w,
        date: w.date,
        tags: parseJSONSafely<string[]>(w.tags, []),
        injuries: parseJSONSafely<string[]>(w.injuries, []),
        sparringRounds: parseJSONSafely<Workout['sparringRounds']>(w.sparringRounds, []),
    }));
});


export const createWorkout = createAsyncThunk<
    Workout,
    Workout,
    { extra: ThunkExtraArgument; rejectValue: string }
>('workouts/create', async (workout, {extra, rejectWithValue}) => {
        try {
            const {repository} = extra;
            await repository.insertWorkout(workout);
            return workout;
        } catch (error) {
            return rejectWithValue('Failed to insert workout');
        }
    }
);

export const getWorkoutById = createAsyncThunk<
    Workout | undefined,
    UUID,
    { extra: ThunkExtraArgument; rejectValue: string }
>('workouts/getById',
    async (id, {extra, rejectWithValue}) => {
        try {
            const {repository} = extra;
            // Fixed method name to match repository implementation
            const workout = await repository.getWorkoutById(id);

            if (!workout) {
                return rejectWithValue(`Workout with id ${id} not found`);
            }

            return {
                ...workout,
                date: workout.date,
                tags: parseJSONSafely<string[]>(workout.tags, []),
                injuries: parseJSONSafely<string[]>(workout.injuries, []),
                sparringRounds: parseJSONSafely<Workout['sparringRounds']>(workout.sparringRounds, []),
            };
        } catch (error) {
            return rejectWithValue(`Failed to get workout: ${error}`);
        }
    });

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
            })
            .addCase(createWorkout.fulfilled, (state, action) => {
                state.workouts.unshift(action.payload);
            })
            .addCase(getWorkoutById.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {addWorkout} = workoutsSlice.actions;

export default workoutsSlice.reducer;
