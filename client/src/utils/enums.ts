export enum Place {
  main = "main",
  waiting = "waiting",
  staging = "staging",
}

export enum Role {
  admin = "admin",
  moderator = "moderator",
  user = "user",
}

export enum VoteKind {
  like = "like",
  dislike = "dislike",
}
export enum VoteMethod {
  give = "push",
  take = "pull",
}

export enum Seniority {
  trainee = "Trainee",
  junior = "Junior",
  regular = "Regular",
  senior = "Senior",
  techLead = "Tech Lead",
  principal = "Principal Engineer",
}

export const expCaps = {
  [Seniority.trainee]: 0,
  [Seniority.junior]: 100,
  [Seniority.regular]: 200,
  [Seniority.senior]: 500,
  [Seniority.techLead]: 1000,
  [Seniority.principal]: 2000,
};

export enum Technology {
  Frontend = "Frontend",
  Backend = "Backend",
  Java = "Java",
  DevOps = "DevOps",
  Python = "Python",
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
  CSharp = "C#",
  Ruby = "Ruby",
  PHP = "PHP",
  Swift = "Swift",
  Kotlin = "Kotlin",
  Go = "Go",
  Rust = "Rust",
  Space = "",
}
