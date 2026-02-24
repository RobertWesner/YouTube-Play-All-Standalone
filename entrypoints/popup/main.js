import './main.scss';
import { $component } from './src/component.js';
import { navigateTo } from './src/navigate.js';
import { HomeView } from './views/home.js';
import { TestView } from './views/test.js';
import { AboutView } from './views/about.js';
import { SettingsView } from './views/settings.js';

const views = [
    HomeView(),
    AboutView(),
    SettingsView(),
    TestView(),
];

document.body.append($component('main')(...views));
navigateTo('home');
