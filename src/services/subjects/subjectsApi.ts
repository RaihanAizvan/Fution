export interface SubjectApiClient {
  listSubjects: () => Promise<unknown>
  fetchSubject: (slug: string) => Promise<unknown>
}

export const subjectsApi: SubjectApiClient = {
  async listSubjects() {
    throw new Error('Subjects API not implemented')
  },
  async fetchSubject() {
    throw new Error('Subjects API not implemented')
  }
}
