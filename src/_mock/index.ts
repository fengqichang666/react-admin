import { setupWorker } from 'msw/browser';

import orgMockApi from './handlers/_org.js';
import userMockApi from './handlers/_user.js';

const handlers = [...userMockApi, ...orgMockApi];
export const worker = setupWorker(...handlers);
