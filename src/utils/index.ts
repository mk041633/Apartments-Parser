export class Utils {
    public static async sleep(ms: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }
}