import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Workout} from "@/domain/workout";
import WorkoutRepository from "@/db/repository/workout.repository";
import {UUID} from "crypto";

interface WorkoutsState {
    workouts: Workout[];
    currentWorkout?: Workout;
    loading: boolean;
    error?: string;
}

const initialState: WorkoutsState = {
    workouts: [],
    currentWorkout: undefined,
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
    Workout,
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
        // Reducers synchrones si nécessaire (ex: clearCurrentWorkout)
        clearCurrentWorkout: (state) => {
            state.currentWorkout = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            // Load Workouts
            .addCase(loadWorkouts.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(loadWorkouts.fulfilled, (state, action: PayloadAction<Workout[]>) => {
                state.loading = false;
                state.workouts = action.payload;
            })
            .addCase(loadWorkouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Vient de rejectWithValue
            })

            // Create Workout
            .addCase(createWorkout.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createWorkout.fulfilled, (state, action: PayloadAction<Workout>) => {
                state.loading = false;
                state.workouts.unshift(action.payload); // Ajoute au début de la liste
                // Optionnel: définir le workout créé comme currentWorkout
                // state.currentWorkout = action.payload;
            })
            .addCase(createWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Workout By Id
            .addCase(getWorkoutById.pending, (state) => {
                state.loading = true;
                state.currentWorkout = undefined; // Optionnel: clearer pendant le chargement
                state.error = undefined;
            })
            .addCase(getWorkoutById.fulfilled, (state, action: PayloadAction<Workout>) => {
                state.loading = false;
                state.currentWorkout = action.payload;
            })
            .addCase(getWorkoutById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const {} = workoutsSlice.actions;

export default workoutsSlice.reducer;
