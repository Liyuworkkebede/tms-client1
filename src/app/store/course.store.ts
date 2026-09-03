import { inject } from '@angular/core';
import {
  signalStore,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import {
  withEntities,
  setAllEntities,
  removeEntity,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap, catchError, EMPTY } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

export const CourseStore = signalStore(
  { providedIn: 'root' },
  withState({ isLoading: false, error: null as string | null }),
  // withEntities provides an O(1) ID-indexed dictionary for the course collection
  withEntities<Course>(),
  withMethods((store, svc = inject(CourseService)) => ({

    // ----------------------------------------------------------------
    // Load all courses from the API into the store
    // ----------------------------------------------------------------
    loadCourses: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          svc.getAll().pipe(
            tap((courses) =>
              patchState(store, setAllEntities(courses), { isLoading: false })
            ),
            catchError((err) => {
              patchState(store, { isLoading: false, error: err.message });
              return EMPTY;
            })
          )
        )
      )
    ),

    // ----------------------------------------------------------------
    // Optimistic deletion with automatic snapshot rollback.
    //
    // Execution order is critical:
    //   1. Snapshot BEFORE patchState — otherwise the deleted item is
    //      already gone from the snapshot and rollback is incomplete.
    //   2. Immediately remove from UI (instant visual feedback).
    //   3. Fire DELETE to the server.
    //   4. On error (e.g. 409 Conflict — active enrollments exist),
    //      restore the snapshot and surface a user-facing error message.
    // ----------------------------------------------------------------
    deleteCourse(id: number) {
      // Step 1: capture current state BEFORE any mutation
      const previousSnapshot = store.entities();

      // Step 2: instant visual feedback — entity disappears from UI immediately
      patchState(store, removeEntity(id));

      // Step 3 + 4: server call with rollback on failure
      svc.delete(id).pipe(
        catchError(() => {
          // Server rejected the deletion (e.g. 409 Conflict with active enrollments)
          patchState(store, setAllEntities(previousSnapshot));
          patchState(store, {
            error: 'Cannot delete course: active student enrollments exist.',
          });
          return EMPTY;
        })
      ).subscribe();
    },

  }))
);
