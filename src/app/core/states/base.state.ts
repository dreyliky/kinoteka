import { BehaviorSubject, Observable } from 'rxjs';

/**
 *	@class
 *	@classdes This is a base class that used for creating hight level state classes
 */
export abstract class BaseState<T> {

	/**
	 * 	Get Observable with state data.
     *	@return {Generic} Observable with the state data.
     */
	public get data$(): Observable<T | null> {
		return this._data$.asObservable();
	}

	/**
	 * 	Get state data.
     *	@return {Generic} State data.
     */
	public get data(): T | null {
		return this._data$.value;
	}

	/**
	 * 	Main `Observable` with state data. Must be isolated to avoid possible issues.
     *	@return {BehaviorSubject<Generic>} BehaviorSubject with state data.
     */
	protected readonly _data$: BehaviorSubject<T | null>;

	constructor(private initialData: T | null = null) {
		this._data$ = new BehaviorSubject<T | null>(this.initialData);
	}

	/**
	 *	Set new value to state
	 */
	public set(value: T): void {
		this.setNewValue(value);
	}

	/**
	 * 	Clear state value. (Will be set `null`)
	 */
	public clear(): void {
		this.setNewValue(null);
	}

	/**
	 * 	Protected method for set data functionality. May be expanded.
     */
	protected setNewValue(value: T | null): void {
		this._data$.next(value);
	}

	/**
	 * 	Method used for try to work out any method
     *	@return {Generic} the x value.
     */
	protected tryDoAction<V>(actionName: string, actionFunc: () => any): V | undefined {
		try {
			return actionFunc();
		} catch (e: any) {
			this.catchError(e, actionName);

            return undefined;
		}
	}

	/**
	 *	Method that	processed error for user friendly error messages
     */
	protected catchError(e: Error, actionName: string): void {
		if (e instanceof TypeError) {
			throw new Error(`Can not ${actionName}. Firstly set array.`);
		}

		throw new Error(`Error: '${e.message}' in action '${actionName}'`);
	}
}
