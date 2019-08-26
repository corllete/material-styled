/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, color, text } from '@storybook/addon-knobs';

import { Tabs, Tab } from '../src/Tabs';
import MaterialThemeProvider from '../src/theme/ThemeProvider';

import TabsReadme from './docs/Tabs.md';

storiesOf('Tab', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MaterialThemeProvider theme={{ primary: '#03A9F4' }}>
      <div style={{ padding: '3rem' }}>{story()}</div>
    </MaterialThemeProvider>
  ))
  .addParameters({
    readme: {
      content: TabsReadme,
      sidebar: TabsReadme,
    },
  })
  .add('default', () => (
    <Tabs>
      <Tab label="Tab One">
        First tab content is great
      </Tab>
      <Tab label="Tab Two">
        Tab two has content as well
      </Tab>
      <Tab label="Tab Three">
        Totally tabular
      </Tab>
    </Tabs>
  ))
  .add('fixed tabs custom styles', () => {
    const styleProps = {
      width: number('width', 130),
      activeBackgroundColor: color('activeBackgroundColor', '#b5211e'),
      passiveBackgroundColor: color('passiveBackgroundColor', '#df4340'),
      activeFontColor: color('activeFontColor', '#fff'),
      passiveFontColor: color('passiveFontColor', '#c2c2c2'),
      showInkbar: boolean('showInkbar', false),
    };
    const tab1Context = text('First tab', 'First tab content is great');
    return (
      <Tabs {...styleProps}>
        <Tab label="Tab One">
          {tab1Context}
        </Tab>
        <Tab label="Tab Two">
        Tab two has content as well
        </Tab>
        <Tab label="Tab Three">
        Totally tabular
        </Tab>
      </Tabs>
    );
  });
