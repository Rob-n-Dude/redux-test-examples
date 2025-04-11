export const mockAsyncFunction = (): Promise<number> => (
  new Promise((resolve) => {
    setTimeout(() => {
      const rnd = Math.floor(Math.random() * 15)
      resolve(rnd)
    }, 1000)
  })
)