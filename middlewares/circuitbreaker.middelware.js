'use strict';

import {
  circuitBreaker,
  ConsecutiveBreaker,
  retry,
  handleAll,
  timeout
} from 'cockatiel';

// Retry policy
const retryPolicy = retry(handleAll, {
  maxAttempts: 3
});

// Circuit Breaker Policy
const breakerPolicy = circuitBreaker(handleAll, {
  halfOpenAfter: 10000, // 10 seconds
  breaker: new ConsecutiveBreaker(5) // open after 5 failures
});

// Timeout Policy
const timeoutPolicy = timeout(3000); // 3 sec timeout

// Combine policies
export const grpcPolicy = retryPolicy.wrap(
  breakerPolicy.wrap(
    timeoutPolicy
  )
);