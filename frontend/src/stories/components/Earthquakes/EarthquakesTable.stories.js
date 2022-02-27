import React from 'react';

import EarthquakesTable from "main/components/Earthquakes/EarthquakesTable";
import { earthquakesFixtures } from 'fixtures/earthquakesFixtures';

export default {
    title: 'components/Earthquakes/EarthquakesTable',
    component: EarthquakesTable
};

const Template = (args) => {
    return (
        <EarthquakesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    subjects: []
};

export const OneEarthquake = Template.bind({});

OneEarthquake.args = {
    subjects: earthquakesFixtures.oneEarthquake
};


