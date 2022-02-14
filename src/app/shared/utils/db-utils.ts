export function convertSnaps<T>(results: any) {
  return <T[]> results.docs.map((snap: { id: any; data: () => any }) => {
    return {
      id: snap.id,
      ...<any>snap.data()
    }
  })
}
