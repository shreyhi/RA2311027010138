# Stage 1 - Notification Priority System

## Approach

- Fetched notifications using API
- Assigned weights:
  - Placement = 3
  - Result = 2
  - Event = 1
- Sorted notifications based on:
  1. Type weight
  2. Timestamp (latest first)
- Selected top 10 notifications

## Optimization

- Sorting ensures efficient ranking
- Only top 10 extracted after sorting

## Logging

- Logging middleware used to track API calls and processing steps