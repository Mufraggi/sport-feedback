import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {AppDispatch, RootState} from '@/store/store';
import {addWorkout, loadWorkouts} from '@/state/workoutsSlice';
import {Workout} from '@/domain/workout';

type UseWorkoutsResult = {
    workouts: Workout[];
    loading: boolean;
    add: (workout: Workout) => void;
};
// Hook typé pour `useDispatch`
const useAppDispatch: () => AppDispatch = useDispatch;

// Hook typé pour `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useWorkouts = (): UseWorkoutsResult => {
    const workouts = useAppSelector((state) => state.workouts.workouts);
    const loading = useAppSelector((state) => state.workouts.loading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadWorkouts());
    }, [dispatch]);

    const add = (w: Workout) => {
        dispatch(addWorkout(w));
    };

    return {workouts, loading, add};
};
