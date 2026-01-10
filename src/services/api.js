/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import axios from "axios";

export const api = axios.create({
  baseURL: 'http://https://cauafialho.free.nf/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
