# Time Tracker

## Overview

This project provides a platform designed to streamline project management and task allocation across teams. At its core, the application facilitates efficient tracking and organization of projects and tasks, ensuring that team members have clear visibility into their responsibilities and deadlines.

## Key Features


- Access a detailed weekly/historical view of tasks at the `/home` endpoint.
- The interface includes an expandable table for in-depth information on each TimeEntry.

![TimeEntry Details](/src/tableView.png "Detailed View of Task Entries")



## Technology Stack

This project uses typeorm to avoid mysql code in javascript.

## Installation

This is the Backend Counterpart of https://github.com/vivre111/Time-Tracker

**please follow the instruction here on backend first as the frontend relies on it**

to run frontend on docker:

```bash
git clone https://yourrepositoryurl.com
cd Time-Tracker-API
docker compose up
```

Note: in the first run, the backend program may start before mySQL setup is complete.

If this happen, Stop both Containers, Start the MySQL Container First, when it is ready, start the Backend Container.

to run locally:

```bash
git clone https://yourrepositoryurl.com
cd Time-Tracker
```
Then you need to modify ormconfig.json, making it connect to your local database.

Change 
```
    "host": "db",
    "port": 3306,
```
to
```
    "host": "localhost",
    "port": 3308(or your local mysql port number),
```

Then, you can continue running the app

```bash
yarn
yarn start
```

## Unit Tests
To run unit tests
```bash
yarn test
```