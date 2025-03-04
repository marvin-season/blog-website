export declare global {
    interface ArrayConstructor {
        fromAsync<T, U>(
            iterableOrArrayLike: AsyncGenerator<T> | Iterable<T | PromiseLike<T>>,
            mapFn: (value: Awaited<T>) => U
        ): Promise<Awaited<U>[]>
    }
}