import type { Dispatch, DispatchWithoutAction, SetStateAction } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { dlog } from "./utils";

/* eslint-disable no-console */

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
	try {
		return value === "undefined" ? undefined : JSON.parse(value ?? "");
	} catch (error) {
		console.error("parsing error on", { value }, error);
		return undefined;
	}
}

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
	// Get from local storage then
	// parse stored json or return initialValue
	const readValue = useCallback((): T => {
		// Prevent build error "window is undefined" but keeps working
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? (parseJSON(item) as T) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	}, [initialValue, key]);

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(readValue);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue: Dispatch<SetStateAction<T>> = useCallback(
		(value) => {
			// Prevent build error "window is undefined" but keeps working
			if (typeof window === "undefined") {
				console.warn(
					`Tried setting localStorage key “${key}” even though environment is not a client`,
				);
			}

			try {
				// Allow value to be a function so we have the same API as useState
				const newValue = value instanceof Function ? value(storedValue) : value;

				// Save to local storage
				window.localStorage.setItem(key, JSON.stringify(newValue));

				// Save state
				setStoredValue(newValue);
			} catch (error) {
				console.error(`Error setting localStorage key “${key}”:`, error);
			}
		},
		[key, storedValue],
	);

	useEffect(() => {
		setStoredValue(readValue());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [storedValue, setValue];
}

// https://gist.github.com/kyleshevlin/08a2deb904b79077e46966567ccabf06
export function useBool(initialState = false) {
	const [state, setState] = useState(initialState);

	// Instead of individual React.useCallbacks gathered into an object
	// Let's memoize the whole object. Then, we can destructure the
	// methods we need in our consuming component.
	const handlers = useMemo(
		() => ({
			setTrue: () => setState(true),
			setFalse: () => setState(false),
			toggle: () => setState((s) => !s),
			reset: () => setState(initialState),
		}),
		[initialState],
	);

	return [state, handlers] satisfies [
		boolean,
		{
			setTrue: DispatchWithoutAction;
			setFalse: DispatchWithoutAction;
			toggle: DispatchWithoutAction;
			reset: DispatchWithoutAction;
		},
	];
}

/** @deprecated */
export function useLocalStorageOld<T>(key: string, initialValue: T) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") {
			console.warn("No window yet in useLocalStorage");
			return initialValue;
		}
		try {
			dlog("init", key);
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.error(key, error);
			return initialValue;
		}
	});
	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue: Dispatch<SetStateAction<T>> = (
		value: T | ((val: T) => T),
	) => {
		if (typeof window === "undefined") {
			console.warn("No window yet in useLocalStorage");
			return;
		}
		try {
			dlog("save", key);
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.error(key, error);
		}
	};
	return [storedValue, setValue] satisfies [T, Dispatch<SetStateAction<T>>];
}

export function useEffectOnce(fn: () => void) {
	const ref = useRef(false);
	useEffect(() => {
		if (!ref.current) {
			fn();
		}
		return () => {
			ref.current = true;
		};
	}, [fn]);
}

/* eslint-enable no-console */
