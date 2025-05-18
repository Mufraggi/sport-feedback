import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {AppDispatch, RootState} from '@/store/store';
import {createWorkout, getWorkoutById, loadWorkouts,} from '@/state/workoutsSlice';
import {Workout} from '@/domain/workout';
import {UUID} from "crypto";

// Hook typé pour `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook typé pour `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type UseWorkoutsResult = {
    workouts: Workout[];
    loading: boolean;
    error: string | undefined;
    addWorkout: (workout: Workout) => Promise<Workout>;
    getById: (id: UUID) => Promise<Workout | undefined>;
    refreshWorkouts: () => Promise<void>;
};

/**
 * Hook for accessing and managing workouts
 */
export const useWorkouts = (): UseWorkoutsResult => {
    const dispatch = useAppDispatch();
    const workouts = useAppSelector((state) => state.workouts.workouts);
    const loading = useAppSelector((state) => state.workouts.loading);
    const error = useAppSelector((state) => state.workouts.error);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            dispatch(loadWorkouts())
                .unwrap()
                .then(() => setIsInitialized(true))
                .catch((err) => console.error("Failed to load workouts:", err));
        }
    }, [dispatch, isInitialized]);

    const addWorkout = useCallback(
        async (workout: Workout): Promise<Workout> => {
            try {
                const resultAction = await dispatch(createWorkout(workout));
                return resultAction.payload as Workout;
            } catch (error) {
                console.error("Failed to add workout:", error);
                throw error;
            }
        },
        [dispatch]
    );

    // Get a workout by ID
    const getById = useCallback(
        async (id: UUID): Promise<Workout> => {
            try {
                const resultAction = await dispatch(getWorkoutById(id));
                return resultAction.payload as Workout;
            } catch (error) {
                console.error(`Failed to get workout with ID ${id}:`, error);
                throw error;
            }
        },
        [dispatch]
    );

    // Refresh workouts from database
    const refreshWorkouts = useCallback(
        async (): Promise<void> => {
            try {
                await dispatch(loadWorkouts()).unwrap();
            } catch (error) {
                console.error("Failed to refresh workouts:", error);
                throw error;
            }
        },
        [dispatch]
    );

    return {
        workouts,
        loading,
        error,
        addWorkout,
        getById,
        refreshWorkouts,
    };
};