// fromAsync polyfill
// 添加 fromAsync 类型声明 到 Array
if (!Array.fromAsync) {
    function fromAsync<T, U>(
        iterableOrArrayLike: Iterable<T | PromiseLike<T>>,
        mapFn: (value: Awaited<T>) => U
    ): Promise<Awaited<U>[]> {
        return new Promise(async (resolve, reject) => {
            const mapResult: Awaited<U>[] = []
            for await (const element of iterableOrArrayLike) {
                const result = await mapFn(element)
                mapResult.push(result)
            }
            resolve(mapResult);
        })
    }

    Array.fromAsync = fromAsync
}

