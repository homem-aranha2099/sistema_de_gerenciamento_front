/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost/arquivos/sistema%20de%20gerenciamento',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
