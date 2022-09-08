/**
 * Main Application script
 */
import React, { FunctionComponent, useRef } from 'react';
import { BryntumScheduler } from '../build/transpiled/node_modules/@bryntum/scheduler-react/lib/BryntumScheduler.js';
import { schedulerConfig } from './SchedulerConfig';

const App: FunctionComponent = () => {

    const scheduler = useRef<BryntumScheduler>(null);

    return (
        <BryntumScheduler
            ref = {scheduler}
            {...schedulerConfig}
        />
    );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://www.bryntum.com/docs/scheduler/guide/Scheduler/integration/react/data-binding

export default App;
