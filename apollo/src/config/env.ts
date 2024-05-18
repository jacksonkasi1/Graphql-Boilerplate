export interface Env {
  DB: D1Database;
}

export interface Context {
  env: {
    DB: D1Database;
  };
  request: Request;
}
