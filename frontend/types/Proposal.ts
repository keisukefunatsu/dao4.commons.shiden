export interface AddProposalFormData {
    proposalKind: number
    title: string
    outline: string
    detail: string
    githubURL: string
  }

  export interface ProposalInfo {
    proposalKind: number
    title: string
    outline: string
    details: string
    githubURL: string
    proposalId:string
    proposalStatus: number
  }
