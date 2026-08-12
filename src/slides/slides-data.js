// ponytail: master slides registry aggregating slide-01.js through slide-23.js with step-based graph active nodes mapping
import { slide01 } from './slide-01.js';
import { slide02 } from './slide-02.js';
import { slide03 } from './slide-03.js';
import { slide04 } from './slide-04.js';
import { slide05 } from './slide-05.js';
import { slide06 } from './slide-06.js';
import { slide07 } from './slide-07.js';
import { slide08 } from './slide-08.js';
import { slide09 } from './slide-09.js';
import { slide10 } from './slide-10.js';
import { slide11 } from './slide-11.js';
import { slide12 } from './slide-12.js';
import { slide13 } from './slide-13.js';
import { slide14 } from './slide-14.js';
import { slide15 } from './slide-15.js';
import { slide16 } from './slide-16.js';
import { slide17 } from './slide-17.js';
import { slide18 } from './slide-18.js';
import { slide19 } from './slide-19.js';
import { slide20 } from './slide-20.js';
import { slide21 } from './slide-21.js';
import { slide22 } from './slide-22.js';
import { slide23 } from './slide-23.js';

const activeNodesMap = {
  1: [], // Slide 1: full randomized highlight across all 132 nodes
  2: ['AgentialCut', 'ForensicMateriality', 'SCAR'],
  3: ['NTM', 'zState', 'vFoerster', 'SCAR'],
  4: ['NTM', 'zState', 'vFoerster', 'Hysteresis'],
  5: ['Barad', 'IntraAction', 'AgentialCut'],
  6: {
    0: ['Simondon', 'PreIndividual'],
    1: ['Simondon', 'PreIndividual', 'AgentialCut'],
    2: ['Crystallized', 'Pickering', 'SCAR']
  },
  7: {
    0: ['SCAR'],
    1: ['vFoerster', 'Luhmann', 'SCAR'],
    2: ['Deleuze', 'SCAR'],
    3: ['Barad', 'SCAR'],
    4: ['Simondon', 'SCAR'],
    5: ['vFoerster', 'Luhmann', 'Deleuze', 'Barad', 'Simondon', 'SCAR'],
    6: ['Konsistenz', 'ImmanentPleat', 'Spacetimemattering', 'Crystallized', 'SCAR']
  },
  8: ['SpiralNode', 'PrismNode', 'MeshNode', 'Hozho'],
  9: {
    0: ['SpiralNode'],
    1: ['PrismNode'],
    2: ['MeshNode'],
    3: ['Hozho']
  },
  10: {
    0: ['Autopoiesis', 'MaturanaVarela'],
    1: ['Impaired', 'SoC', 'SCAR']
  },
  11: ['SpiralNode', 'PrismNode', 'MeshNode', 'Hozho', 'SCAR'],
  12: ['Hozho', 'Impaired', 'SCAR'],
  13: {
    0: ['SoC'],
    1: ['zState'],
    2: ['AgentialCut'],
    3: ['GoedelianWound']
  },
  14: {
    0: ['AgentialCut', 'ForensicMateriality'],
    1: ['ConfucianKernel', 'AntiKintsugi'],
    2: ['Deleuze', 'Barad', 'vFoerster'],
    3: ['vFoerster', 'SoC'],
    4: ['Simondon', 'Luhmann', 'von Foerster'],
    5: ['GoedelianWound', 'WesternDiagnostic']
  },
  15: ['AgentialCut', 'Trace', 'SCAR'],
  16: ['ConfucianKernel', 'UglyScar', 'AntiKintsugi'],
  17: ['SCAR', 'UglyScar', 'Haraway'],
  18: {
    0: ['Deleuze'],
    1: ['PerpetratorsQ', 'AsymmetricAcc', 'ResponseAbility'],
    2: ['Spillers', 'SCAR']
  },
  19: {
    0: ['ConfucianKernel'],
    1: ['AntiKintsugi'],
    2: ['UglyScar'],
    3: ['Glissant', 'SCAR']
  },
  20: ['SCAR', 'GoedelianWound'],
  21: ['GoedelianWound', 'WesternDiagnostic', 'ForensicMateriality'],
  22: ['SCAR'],
  23: [] // Slide 23: full randomized highlight across all 132 nodes
};



const rawSlides = [
  slide01, slide02, slide03, slide04, slide05, slide06, slide07,
  slide08, slide09, slide10, slide11, slide12, slide13, slide14,
  slide15, slide16, slide17, slide18, slide19, slide20, slide21,
  slide22, slide23
];

export const slidesData = rawSlides.map(slide => ({
  ...slide,
  activeNodes: activeNodesMap[slide.id] || []
}));
