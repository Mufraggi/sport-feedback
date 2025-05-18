import {configureStore, ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';
import workoutsReducer from '@/state/workoutsSlice';
import WorkoutRepository from '@/db/repository/workout.repository';
import {getDBConnection} from '@/db/database';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// Ce sera initialisé dynamiquement
const db = getDBConnection()
const repository: WorkoutRepository = new WorkoutRepository(db);


export const store = configureStore({
    reducer: {
        workouts: workoutsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {repository: repository}, // Start with null repository
            },
            serializableCheck: {
                // Ignore these paths in the serializable check as they contain non-serializable values
                ignoredActions: ['workouts/load/fulfilled', 'workouts/create/fulfilled'],
                ignoredPaths: ['thunk.extra.repository'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, { repository: WorkoutRepository }, UnknownAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
