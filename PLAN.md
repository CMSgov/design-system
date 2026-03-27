## Implementation Plan: Convert `Mask` to Functional Component

Goal: migrate `Mask` from class-based `PureComponent` to a function component with hooks in `packages/design-system/src/components/TextField/Mask.tsx` while preserving behavior, API, markup, and test expectations.

### Phase 1: Baseline and parity map

1. Read current behavior in `Mask.tsx` and list exact class responsibilities:
   - Constructor initialization of internal value.
   - `componentDidUpdate` sync logic for controlled value changes.
   - Deferred `onBlur` invocation timing.
   - Child cloning and overlay rendering output.
2. Read `Mask.test.tsx` and map each test to one of the above responsibilities.
3. Create a short parity checklist (in this file) to verify no behavior regressions during rewrite.

### Phase 2: Component skeleton conversion

4. Replace class declaration with function component signature using existing props type.
5. Keep both exports intact (`export const Mask` and `export default Mask`).
6. Keep all existing utility imports/usage unchanged unless type updates require minimal adjustments.

### Phase 3: State and ref typing hardening

7. Replace class state with `useState<string>` for the masked display value.
8. Add typed refs for:
   - Deferred blur event storage.
   - Previous controlled value snapshot.
   - Any other class field equivalents previously used for lifecycle logic.
9. Remove `any` from internal state/event/ref paths and replace with specific React/DOM types.

### Phase 4: Lifecycle equivalence with hooks

10. Recreate constructor initialization semantics inside initial state setup.
11. Recreate `componentDidUpdate` controlled/uncontrolled sync behavior with `useEffect`:
    - Detect controlled value changes.
    - Apply `unmaskValue`/`maskValue` consistently with current behavior.
    - Avoid extra updates that would diverge from previous render timing.
12. Preserve deferred blur callback semantics (including timing and payload shape) using refs/effects where needed.

### Phase 5: Handler and render parity

13. Convert class methods to typed callbacks (`onChange`, `onBlur`, etc.) with strict event signatures.
14. Keep child handling identical:
    - Continue using `getOnlyChild`.
    - Continue using `cloneElement` to inject props.
15. Keep output markup, CSS class names, mask overlay behavior, and `maskPattern` usage unchanged.

### Phase 6: Validation and finish

16. Run focused tests for `Mask`:
    - `packages/design-system/src/components/TextField/Mask.test.tsx`
17. If available, run related `TextField` tests to catch integration regressions.
18. Resolve only issues introduced by this refactor; do not fix unrelated failures.
19. Confirm acceptance criteria:
    - No API surface changes.
    - Named + default exports preserved.
    - No `any` in new component internals.
    - Existing test expectations still pass.

### Execution protocol

20. Pause after each phase for approval before moving to the next phase.
21. Keep changes scoped to `Mask.tsx` and tests only when required by parity.
22. Prefer minimal, surgical edits over broad rewrites.

### Parity checklist (complete during implementation)

- [ ] Constructor-equivalent initialization preserved.
- [ ] Controlled value sync matches prior class behavior.
- [ ] Deferred `onBlur` timing matches prior behavior.
- [ ] Child clone/injected props unchanged.
- [ ] Rendered structure/classes unchanged.
- [ ] Named + default exports both present.
- [ ] `Mask.test.tsx` passes.
