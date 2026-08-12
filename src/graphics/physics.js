// ponytail: rhizome physics engine with 200-node Obsidian vault replica, smooth aura cross-fading, micro data packet pulse to SCAR, targeting reticle brackets, micro telemetry, and continuous SCAR growth
import { themeManager } from '../config/theme-manager.js';

export class RhizomePhysics {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.edges = [];
    this.clusters = {};
    this.nodeMap = new Map();
    this.adjMap = null;
    this.currentSlideIndex = 1;
    this.activeNodeIds = [];
    this.tickerIndex = 0;
    this.lastTickerTime = performance.now();
    this.highlightDuration = 3400; // 3.4s highlight holding window
    this.highlightedNodeId = null;
    this.cachedShortestPath = null;
    this.lastPathStartId = null;
    this.initGraph();
  }

  initGraph() {
    this.nodes = [];
    this.edges = [];
    this.clusters = {};
    this.nodeMap.clear();
    this.adjMap = null;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.canvas.width = width;
    this.canvas.height = height;
    const cx = width / 2;
    const cy = height / 2;
    const rx = width * 0.33;
    const ry = height * 0.33;

    // Theoretical Clusters
    this.clusters = {
      A: { id: 'A', label: 'CYBERNETICS // SYSTEMS', x: cx - rx * 0.52, y: cy - ry * 0.42, auraAnim: 0.0 },
      B: { id: 'B', label: 'DELEUZE // MATERIALISM', x: cx + rx * 0.52, y: cy - ry * 0.42, auraAnim: 0.0 },
      C: { id: 'C', label: 'BARAD // AGENTIAL REALISM', x: cx + rx * 0.52, y: cy + ry * 0.42, auraAnim: 0.0 },
      D: { id: 'D', label: 'ETHICS & LIMITS', x: cx, y: cy + ry * 0.52, auraAnim: 0.0 },
      E: { id: 'E', label: 'ANATOMY & SCLEROSIS', x: cx - rx * 0.52, y: cy + ry * 0.42, auraAnim: 0.0 }
    };

    const nodeDefs = [
      // ==========================================
      // CLUSTER A: Cybernetics & Systems (40 nodes)
      // ==========================================
      { id: 'vFoerster', label: 'Heinz von Foerster', cluster: 'A', isPerson: true },
      { id: 'Wiener', label: 'Norbert Wiener', cluster: 'A', isPerson: true },
      { id: 'Shannon', label: 'Claude Shannon', cluster: 'A', isPerson: true },
      { id: 'Ashby', label: 'W. Ross Ashby', cluster: 'A', isPerson: true },
      { id: 'Meadows', label: 'Donella Meadows', cluster: 'A', isPerson: true },
      { id: 'NTM', label: 'Non-Trivial Machine', cluster: 'A', isPerson: false },
      { id: 'zState', label: 'z-State', cluster: 'A', isPerson: false },
      { id: 'SpiralNode', label: 'Hysteretic Spiral', cluster: 'A', isPerson: false },
      { id: 'SoC', label: 'Second-Order Cybernetics', cluster: 'A', isPerson: false },
      { id: 'Luhmann', label: 'Niklas Luhmann', cluster: 'A', isPerson: true },
      { id: 'Konsistenz', label: 'Konsistenzpruefung', cluster: 'A', isPerson: false },
      { id: 'Autopoiesis', label: 'Autopoiesis', cluster: 'A', isPerson: false },
      { id: 'MaturanaVarela', label: 'Maturana & Varela', cluster: 'A', isPerson: true },
      { id: 'OperationalClosure', label: 'Operational Closure', cluster: 'A', isPerson: false },
      { id: 'Eigenform', label: 'Eigenform', cluster: 'A', isPerson: false },
      { id: 'Hysteresis', label: 'Hysteresis', cluster: 'A', isPerson: false },
      { id: 'Pask', label: 'Gordon Pask', cluster: 'A', isPerson: true },
      { id: 'Impaired', label: 'Impaired Viability', cluster: 'A', isPerson: false },

      // Secondary Pale Background Nodes
      { id: 'SpencerBrown', label: 'George Spencer-Brown', cluster: 'A', isPerson: true, isSecondary: true },
      { id: 'Bateson', label: 'Gregory Bateson', cluster: 'A', isPerson: true, isSecondary: true },
      { id: 'GreyWalter', label: 'Grey Walter', cluster: 'A', isPerson: true, isSecondary: true },
      { id: 'MacKay', label: 'Donald MacKay', cluster: 'A', isPerson: true, isSecondary: true },
      { id: 'Glanville', label: 'Ranulph Glanville', cluster: 'A', isPerson: true, isSecondary: true },
      { id: 'Hyotyniemi', label: 'Heikki Hyötyniemi', cluster: 'A', isPerson: true, isSecondary: true },
      { id: 'FirstOrder', label: 'First-Order Cybernetics', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'FeedbackLoop', label: 'Feedback Loop', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'ConversationTheory', label: 'Conversation Theory', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'ReEntry', label: 'Re-entry', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'StructuralCoupling', label: 'Structural Coupling', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'AutopoieticDeadlock', label: 'Autopoietic Deadlock', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'SystemicLimit', label: 'Systemic Limit', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'NonTrivialMachine', label: 'NTM Machine Ontology', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'InformationAction', label: 'Information as Action', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'SystemsSelfBehavior', label: 'Systems Create Behavior', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'ThermodynamicsBeing', label: 'Thermodynamics of Being', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'MemoryPhysicalInscription', label: 'Memory Inscription', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'MemristorMultiplicity', label: 'Memristor Multiplicity', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'DigitalUndoFiction', label: 'Digital Undo Fiction', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'CognitiveHomeostasis', label: 'Cognitive Homeostasis', cluster: 'A', isPerson: false, isSecondary: true },
      { id: 'PhysarumPolycephalum', label: 'Physarum Intelligence', cluster: 'A', isPerson: false, isSecondary: true },

      // ==========================================
      // CLUSTER B: Deleuze, Materialism & Sound (40 nodes)
      // ==========================================
      { id: 'Deleuze', label: 'Gilles Deleuze', cluster: 'B', isPerson: true },
      { id: 'Guattari', label: 'Félix Guattari', cluster: 'B', isPerson: true },
      { id: 'Bergson', label: 'Henri Bergson', cluster: 'B', isPerson: true },
      { id: 'DeLanda', label: 'Manuel DeLanda', cluster: 'B', isPerson: true },
      { id: 'BwO', label: 'Body without Organs', cluster: 'B', isPerson: false },
      { id: 'RecordingSurface', label: 'Recording Surface', cluster: 'B', isPerson: false },
      { id: 'ImmanentPleat', label: 'Immanent Pleat', cluster: 'B', isPerson: false },
      { id: 'IntensiveFold', label: 'Intensive Fold', cluster: 'B', isPerson: false },
      { id: 'MeshNode', label: 'Mesh', cluster: 'B', isPerson: false },
      { id: 'DesiringMachines', label: 'Desiring-Machines', cluster: 'B', isPerson: false },
      { id: 'RhizomeNode', label: 'Rhizome', cluster: 'B', isPerson: false },
      { id: 'LineOfFlight', label: 'Line of Flight', cluster: 'B', isPerson: false },
      { id: 'Deterritorialization', label: 'Deterritorialization', cluster: 'B', isPerson: false },

      // Secondary Pale Background Nodes
      { id: 'Bousquet', label: 'Joë Bousquet', cluster: 'B', isPerson: true, isSecondary: true },
      { id: 'Cox', label: 'Christoph Cox', cluster: 'B', isPerson: true, isSecondary: true },
      { id: 'Radigue', label: 'Éliane Radigue', cluster: 'B', isPerson: true, isSecondary: true },
      { id: 'Oliveros', label: 'Pauline Oliveros', cluster: 'B', isPerson: true, isSecondary: true },
      { id: 'Ikeda', label: 'Ryoji Ikeda', cluster: 'B', isPerson: true, isSecondary: true },
      { id: 'Wanke', label: 'Riccardo Wanke', cluster: 'B', isPerson: true, isSecondary: true },
      { id: 'Cascone', label: 'Kim Cascone', cluster: 'B', isPerson: true, isSecondary: true },
      { id: 'Antiproduction', label: 'Antiproduction', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'DisjunctiveSynthesis', label: 'Disjunctive Synthesis', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'PlaneOfConsistency', label: 'Plane of Consistency', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'SonicFlux', label: 'Sonic Flux', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'Microsound', label: 'Microsound', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'Spectralism', label: 'Spectralism', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'SoundAsMaterial', label: 'Sound Materiality', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'VibrationalOntology', label: 'Vibrational Ontology', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'BwOTrace', label: 'BwO Trace', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'CompositeFlux', label: 'Composite Flux', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'SpentPotential', label: 'Spent Potential', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'InwardOutwardEthics', label: 'Inward vs Outward Ethics', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'SonicResonance', label: 'Sonic Resonance', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'Microdata', label: 'Microdata Aesthetics', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'NoiseParadigm', label: 'Noise Paradigm', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'ParasiteFunction', label: 'Parasite Function', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'FeedbackDrone', label: 'Feedback Drone', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'AestheticsOfFailure', label: 'Aesthetics of Failure', cluster: 'B', isPerson: false, isSecondary: true },
      { id: 'CounterActualization', label: 'Counter-Actualization', cluster: 'B', isPerson: false, isSecondary: true },

      // ==========================================
      // CLUSTER C: Barad, Posthumanism & Quantum (40 nodes)
      // ==========================================
      { id: 'Barad', label: 'Karen Barad', cluster: 'C', isPerson: true },
      { id: 'Haraway', label: 'Donna Haraway', cluster: 'C', isPerson: true },
      { id: 'Hayles', label: 'N. Katherine Hayles', cluster: 'C', isPerson: true },
      { id: 'Bennett', label: 'Jane Bennett', cluster: 'C', isPerson: true },
      { id: 'Bohr', label: 'Niels Bohr', cluster: 'C', isPerson: true },
      { id: 'AgentialCut', label: 'Agential Cut', cluster: 'C', isPerson: false },
      { id: 'IntraAction', label: 'Intra-Action', cluster: 'C', isPerson: false },
      { id: 'DiscursiveApparatus', label: 'Material-Discursive Apparatus', cluster: 'C', isPerson: false },
      { id: 'Spacetimemattering', label: 'Spacetimemattering', cluster: 'C', isPerson: false },
      { id: 'PrismNode', label: 'Prism / Diffraction', cluster: 'C', isPerson: false },
      { id: 'ResponseAbility', label: 'Response-Ability', cluster: 'C', isPerson: false },
      { id: 'ExteriorityWithin', label: 'Exteriority-Within', cluster: 'C', isPerson: false },
      { id: 'Entanglement', label: 'Entanglement', cluster: 'C', isPerson: false },
      { id: 'Performativity', label: 'Performativity', cluster: 'C', isPerson: false },

      // Secondary Pale Background Nodes
      { id: 'Latour', label: 'Bruno Latour', cluster: 'C', isPerson: true, isSecondary: true },
      { id: 'Clarke', label: 'Bruce Clarke', cluster: 'C', isPerson: true, isSecondary: true },
      { id: 'Cecchetto', label: 'David Cecchetto', cluster: 'C', isPerson: true, isSecondary: true },
      { id: 'Tripaldi', label: 'Laura Tripaldi', cluster: 'C', isPerson: true, isSecondary: true },
      { id: 'Wheeler', label: 'John Wheeler', cluster: 'C', isPerson: true, isSecondary: true },
      { id: 'Harman', label: 'Graham Harman', cluster: 'C', isPerson: true, isSecondary: true },
      { id: 'Bryant', label: 'Levi Bryant', cluster: 'C', isPerson: true, isSecondary: true },
      { id: 'AgentialRealism', label: 'Agential Realism', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'CoConstitution', label: 'Co-Constitution', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'GodTrick', label: 'God-Trick Critique', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'Humanesis', label: 'Humanesis', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'CognitiveAssemblage', label: 'Cognitive Assemblage', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'VibrantMatter', label: 'Vibrant Matter', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'ActorNetwork', label: 'Actor-Network Theory', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'DistributedAgency', label: 'Distributed Agency', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'AgentialSeparability', label: 'Agential Separability', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'Onticology', label: 'Onticology', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'ObjectivityInParentheses', label: 'Objectivity in Parentheses', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'FiniteCut', label: 'Finite Agential Cuts', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'DiffractiveMethodology', label: 'Diffractive Methodology', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'CausalityHandshake', label: 'Causality Handshake', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'ItFromBit', label: 'It from Bit', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'SpacetimematteringLoop', label: 'Spacetimemattering Loop', cluster: 'C', isPerson: false, isSecondary: true },
      { id: 'ParallelMinds', label: 'Parallel Minds', cluster: 'C', isPerson: false, isSecondary: true },

      // ==========================================
      // CLUSTER D: Ethics, Crip & Decolonial Limits (40 nodes)
      // ==========================================
      { id: 'ConfucianKernel', label: 'Confucian Kernel', cluster: 'D', isPerson: false },
      { id: 'UglyScar', label: 'Ugly Scar (Eli Clare)', cluster: 'D', isPerson: false },
      { id: 'AntiKintsugi', label: 'Anti-Kintsugi', cluster: 'D', isPerson: false },
      { id: 'PerpetratorsQ', label: "Perpetrator's Question", cluster: 'D', isPerson: false },
      { id: 'AsymmetricAcc', label: 'Asymmetric Accountability', cluster: 'D', isPerson: false },
      { id: 'Spillers', label: 'Hortense Spillers', cluster: 'D', isPerson: true },
      { id: 'Glissant', label: 'Édouard Glissant', cluster: 'D', isPerson: true },
      { id: 'NegoBispo', label: 'Nego Bispo', cluster: 'D', isPerson: true },
      { id: 'TallBear', label: 'Kim TallBear', cluster: 'D', isPerson: true },
      { id: 'Confluence', label: 'Confluence', cluster: 'D', isPerson: false },
      { id: 'Hozho', label: 'Hozho / Void', cluster: 'D', isPerson: false },
      { id: 'GoedelianWound', label: 'Goedelian Wound', cluster: 'D', isPerson: false },
      { id: 'WesternDiagnostic', label: 'Western Diagnostic', cluster: 'D', isPerson: false },

      // Secondary Pale Background Nodes
      { id: 'Clare', label: 'Eli Clare', cluster: 'D', isPerson: true, isSecondary: true },
      { id: 'Simpson', label: 'Leanne Simpson', cluster: 'D', isPerson: true, isSecondary: true },
      { id: 'Watts', label: 'Vanessa Watts', cluster: 'D', isPerson: true, isSecondary: true },
      { id: 'Butler', label: 'Judith Butler', cluster: 'D', isPerson: true, isSecondary: true },
      { id: 'Foucault', label: 'Michel Foucault', cluster: 'D', isPerson: true, isSecondary: true },
      { id: 'CripTheory', label: 'Crip Theory', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'Kintsugi', label: 'Kintsugi', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'IdeologyOfCure', label: 'Ideology of Cure', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'NonConsensualDamage', label: 'Non-Consensual Damage', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'LandBody', label: 'Land-Body Ontology', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'PlaceThought', label: 'Place-Thought', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'SovereignVoid', label: 'Sovereign Void', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'NormativeViolence', label: 'Normative Violence', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'AsymmetricCost', label: 'Asymmetric Cost', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'NonWesternSound', label: 'Non-Western Sound', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'CureViolence', label: 'Cure as Violence', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'AbsentInterlocutor', label: 'Absent Interlocutor', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'MonumentalizingInjury', label: 'Monumentalizing Injury', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'LandAsPedagogy', label: 'Land as Pedagogy', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'Biopolitics', label: 'Biopolitics', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'RefuseUniversalization', label: 'Refuse Universalization', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'PureDepletion', label: 'Pure Depletion', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'EthicalProsthesis', label: 'Ethical Prosthesis', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'WitnessFunction', label: 'Witness Function', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'PalimpsestCuts', label: 'Palimpsest of Cuts', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'ThermodynamicDebt', label: 'Thermodynamic Debt', cluster: 'D', isPerson: false, isSecondary: true },
      { id: 'BrilliantImperfection', label: 'Brilliant Imperfection', cluster: 'D', isPerson: false, isSecondary: true },

      // ==========================================
      // CLUSTER E: Anatomy, Media Archaeology & Live Coding (40 nodes)
      // ==========================================
      { id: 'Simondon', label: 'Gilbert Simondon', cluster: 'E', isPerson: true },
      { id: 'PreIndividual', label: 'Pre-Individual Field', cluster: 'E', isPerson: false },
      { id: 'Crystallized', label: 'Crystallized Residue', cluster: 'E', isPerson: false },
      { id: 'Pickering', label: 'Andrew Pickering', cluster: 'E', isPerson: true },
      { id: 'Parikka', label: 'Jussi Parikka', cluster: 'E', isPerson: true },
      { id: 'Kirschenbaum', label: 'Matthew Kirschenbaum', cluster: 'E', isPerson: true },
      { id: 'Menkman', label: 'Rosa Menkman', cluster: 'E', isPerson: true },
      { id: 'Hacking', label: 'Ian Hacking', cluster: 'E', isPerson: true },
      { id: 'Derrida', label: 'Jacques Derrida', cluster: 'E', isPerson: true },
      { id: 'Trace', label: 'Trace / Différance', cluster: 'E', isPerson: false },
      { id: 'ForensicMateriality', label: 'Forensic Materiality', cluster: 'E', isPerson: false },
      { id: 'BitRot', label: 'Bit Rot', cluster: 'E', isPerson: false },
      { id: 'Glitch', label: 'Glitch', cluster: 'E', isPerson: false },

      // Secondary Pale Background Nodes
      { id: 'Cardenas', label: 'Alexandra Cárdenas', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'Serres', label: 'Michel Serres', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'Burnham', label: 'Jack Burnham', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'Ascott', label: 'Roy Ascott', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'Betancourt', label: 'Michael Betancourt', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'Fedorova', label: 'Natalia Fedorova', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'Tikka', label: 'Heidi Tikka', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'Adamatzky', label: 'Andrew Adamatzky', cluster: 'E', isPerson: true, isSecondary: true },
      { id: 'LiveCoding', label: 'Live Coding', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'Algorave', label: 'Algorave', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'Strudel', label: 'Strudel / TidalCycles', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'MediaArchaeology', label: 'Media Archaeology', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'WorkHardening', label: 'Work Hardening', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'SclerosisThreshold', label: 'Sclerosis Threshold', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'DigitalMateriality', label: 'Digital Materiality', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'VoiceOfApparatus', label: 'Voice of Apparatus', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'ForensicDecay', label: 'Forensic Decay', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'ErasureParadigm', label: 'Erasure Paradigm', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'CallusingSclerotic', label: 'Callusing Mask', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'SystemsAesthetics', label: 'Systems Aesthetics', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'TelematicArt', label: 'Telematic Art', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'MicroProcess', label: 'Micro-Process', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'MangleMaterial', label: 'Mangle of Practice', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'AlgorithmicSmoothing', label: 'Algorithmic Smoothing', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'NonSpectacularTrace', label: 'Non-Spectacular Trace', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'PhysicalDeformation', label: 'Physical Deformation', cluster: 'E', isPerson: false, isSecondary: true },
      { id: 'RecursiveLooping', label: 'Recursive Looping', cluster: 'E', isPerson: false, isSecondary: true },

      // Central SCAR
      { id: 'SCAR', label: 'SCAR', cluster: 'CENTRAL', isPerson: false }
    ];

    this.nodes = nodeDefs.map((def) => {
      const center = def.cluster === 'CENTRAL' ? { x: cx, y: cy } : this.clusters[def.cluster];
      const offsetRadius = def.isSecondary ? 135 : 70;
      const offsetX = (Math.random() - 0.5) * offsetRadius;
      const offsetY = (Math.random() - 0.5) * offsetRadius;
      const baseRadius = def.id === 'SCAR' ? 4 : (def.isSecondary ? 2.1 : 4.0);
      const nodeObj = {
        ...def,
        x: Math.max(50, Math.min(width - 50, center.x + offsetX)),
        y: Math.max(60, Math.min(height - 60, center.y + offsetY)),
        vx: 0,
        vy: 0,
        radius: baseRadius,
        targetRadius: baseRadius,
        phase: Math.random() * Math.PI * 2,
        highlightAnim: 0.0,
        activeAnim: 0.0,
        burnLevel: 0.0,
        wasEverActive: false
      };
      this.nodeMap.set(def.id, nodeObj);
      return nodeObj;
    });

    // Obsidian Wikilink Edge Matrix
    const rawConnections = [
      // Central SCAR Links
      ['SCAR', 'NTM'], ['SCAR', 'BwO'], ['SCAR', 'AgentialCut'], ['SCAR', 'ConfucianKernel'], ['SCAR', 'PreIndividual'], ['SCAR', 'Impaired'], ['SCAR', 'GoedelianWound'], ['SCAR', 'Confluence'], ['SCAR', 'ForensicMateriality'], ['SCAR', 'Autopoiesis'], ['SCAR', 'Trace'], ['SCAR', 'Glitch'],

      // Cluster A Connections
      ['vFoerster', 'NTM'], ['vFoerster', 'zState'], ['vFoerster', 'SoC'], ['vFoerster', 'Pask'], ['vFoerster', 'Wiener'], ['vFoerster', 'SpencerBrown'], ['vFoerster', 'Bateson'], ['vFoerster', 'Glanville'],
      ['Wiener', 'Ashby'], ['Wiener', 'Shannon'], ['Wiener', 'SoC'], ['Wiener', 'FirstOrder'], ['Wiener', 'FeedbackLoop'],
      ['Shannon', 'NTM'], ['Shannon', 'MacKay'], ['Ashby', 'NTM'], ['Meadows', 'Wiener'], ['Meadows', 'SoC'], ['Meadows', 'FeedbackLoop'],
      ['NTM', 'zState'], ['NTM', 'Hysteresis'], ['NTM', 'SoC'], ['NTM', 'Impaired'], ['NTM', 'Eigenform'], ['NTM', 'FirstOrder'], ['NTM', 'NonTrivialMachine'],
      ['zState', 'Hysteresis'], ['zState', 'Eigenform'], ['zState', 'ReEntry'],
      ['SpiralNode', 'Hysteresis'], ['SpiralNode', 'NTM'], ['SpiralNode', 'SoC'], ['SpiralNode', 'MaturanaVarela'],
      ['SoC', 'Luhmann'], ['SoC', 'Pask'], ['SoC', 'Autopoiesis'], ['SoC', 'MaturanaVarela'], ['SoC', 'OperationalClosure'], ['SoC', 'Glanville'], ['SoC', 'Hyotyniemi'], ['SoC', 'StructuralCoupling'],
      ['Luhmann', 'Konsistenz'], ['Luhmann', 'Autopoiesis'], ['Luhmann', 'OperationalClosure'], ['Luhmann', 'MemoryPhysicalInscription'],
      ['Konsistenz', 'SoC'], ['Konsistenz', 'MemoryPhysicalInscription'],
      ['Autopoiesis', 'MaturanaVarela'], ['Autopoiesis', 'Impaired'], ['Autopoiesis', 'Hysteresis'], ['Autopoiesis', 'OperationalClosure'], ['Autopoiesis', 'AutopoieticDeadlock'],
      ['MaturanaVarela', 'Impaired'], ['MaturanaVarela', 'ObjectivityInParentheses'], ['Eigenform', 'vFoerster'], ['SpencerBrown', 'Eigenform'], ['SpencerBrown', 'Konsistenz'], ['SpencerBrown', 'ReEntry'],
      ['Bateson', 'SoC'], ['Bateson', 'FeedbackLoop'], ['GreyWalter', 'Wiener'], ['GreyWalter', 'Ashby'], ['Glanville', 'vFoerster'], ['ConversationTheory', 'Pask'], ['SystemicLimit', 'Hyotyniemi'], ['MemristorMultiplicity', 'NTM'], ['DigitalUndoFiction', 'MemoryPhysicalInscription'],

      // Cluster B Connections
      ['Deleuze', 'BwO'], ['Deleuze', 'Guattari'], ['Deleuze', 'RecordingSurface'], ['Deleuze', 'ImmanentPleat'], ['Deleuze', 'IntensiveFold'], ['Deleuze', 'Bergson'], ['Deleuze', 'DeLanda'], ['Deleuze', 'Bousquet'], ['Deleuze', 'InwardOutwardEthics'],
      ['Guattari', 'BwO'], ['Guattari', 'DesiringMachines'], ['Guattari', 'LineOfFlight'], ['Guattari', 'Deterritorialization'], ['Guattari', 'Antiproduction'],
      ['BwO', 'RecordingSurface'], ['BwO', 'DesiringMachines'], ['BwO', 'RhizomeNode'], ['BwO', 'Antiproduction'], ['BwO', 'PlaneOfConsistency'], ['BwO', 'BwOTrace'],
      ['RecordingSurface', 'ImmanentPleat'], ['RecordingSurface', 'CompositeFlux'],
      ['ImmanentPleat', 'IntensiveFold'], ['ImmanentPleat', 'SpentPotential'],
      ['IntensiveFold', 'MeshNode'],
      ['MeshNode', 'RecordingSurface'], ['MeshNode', 'BwO'],
      ['RhizomeNode', 'Deleuze'], ['RhizomeNode', 'LineOfFlight'],
      ['LineOfFlight', 'Deterritorialization'], ['DeLanda', 'Deleuze'], ['Bergson', 'Deleuze'], ['Bousquet', 'CounterActualization'],
      ['Cox', 'SonicFlux'], ['Cox', 'Spectralism'], ['Radigue', 'SonicFlux'], ['Radigue', 'FeedbackDrone'], ['Oliveros', 'SonicFlux'], ['Oliveros', 'Microsound'], ['Ikeda', 'Microsound'], ['Ikeda', 'Microdata'], ['Cascone', 'Microsound'], ['Cascone', 'AestheticsOfFailure'], ['Wanke', 'SonicFlux'], ['Serres', 'ParasiteFunction'], ['Serres', 'NoiseParadigm'],

      // Cluster C Connections
      ['Barad', 'AgentialCut'], ['Barad', 'IntraAction'], ['Barad', 'Haraway'], ['Barad', 'DiscursiveApparatus'], ['Barad', 'Spacetimemattering'], ['Barad', 'Bohr'], ['Barad', 'Hayles'], ['Barad', 'Bennett'], ['Barad', 'Latour'], ['Barad', 'AgentialRealism'],
      ['Haraway', 'ResponseAbility'], ['Haraway', 'AsymmetricAcc'], ['Haraway', 'Bennett'], ['Haraway', 'GodTrick'],
      ['Hayles', 'Barad'], ['Hayles', 'DiscursiveApparatus'], ['Hayles', 'CognitiveAssemblage'], ['Hayles', 'Humanesis'],
      ['Bohr', 'AgentialCut'], ['Bennett', 'IntraAction'], ['Bennett', 'VibrantMatter'],
      ['AgentialCut', 'IntraAction'], ['AgentialCut', 'DiscursiveApparatus'], ['AgentialCut', 'PrismNode'], ['AgentialCut', 'ResponseAbility'], ['AgentialCut', 'Performativity'], ['AgentialCut', 'AgentialRealism'], ['AgentialCut', 'FiniteCut'],
      ['IntraAction', 'Spacetimemattering'], ['IntraAction', 'DiscursiveApparatus'], ['IntraAction', 'Entanglement'], ['IntraAction', 'CoConstitution'], ['IntraAction', 'CausalityHandshake'],
      ['Spacetimemattering', 'ExteriorityWithin'], ['Spacetimemattering', 'SpacetimematteringLoop'], ['Entanglement', 'PrismNode'],
      ['PrismNode', 'Spacetimemattering'], ['PrismNode', 'DiffractiveMethodology'],
      ['ResponseAbility', 'AsymmetricAcc'],
      ['ExteriorityWithin', 'GoedelianWound'], ['Latour', 'ActorNetwork'], ['Clarke', 'SoC'], ['Cecchetto', 'Humanesis'], ['Tripaldi', 'VibrantMatter'], ['Tripaldi', 'ParallelMinds'], ['Wheeler', 'ItFromBit'], ['Harman', 'Onticology'], ['Bryant', 'Onticology'],

      // Cluster D Connections
      ['ConfucianKernel', 'AntiKintsugi'], ['ConfucianKernel', 'UglyScar'], ['ConfucianKernel', 'Glissant'], ['ConfucianKernel', 'Spillers'], ['ConfucianKernel', 'NegoBispo'],
      ['UglyScar', 'AntiKintsugi'], ['UglyScar', 'Impaired'], ['UglyScar', 'Spillers'], ['UglyScar', 'Clare'], ['UglyScar', 'IdeologyOfCure'], ['UglyScar', 'PureDepletion'],
      ['PerpetratorsQ', 'AsymmetricAcc'], ['PerpetratorsQ', 'Deleuze'], ['PerpetratorsQ', 'Barad'], ['PerpetratorsQ', 'NonConsensualDamage'],
      ['AsymmetricAcc', 'ResponseAbility'], ['AsymmetricAcc', 'Spillers'], ['AsymmetricAcc', 'NonConsensualDamage'], ['AsymmetricAcc', 'AsymmetricCost'],
      ['Glissant', 'Hozho'], ['Glissant', 'WesternDiagnostic'], ['Glissant', 'Confluence'], ['Glissant', 'RefuseUniversalization'],
      ['NegoBispo', 'Confluence'], ['NegoBispo', 'Glissant'], ['TallBear', 'Hozho'], ['TallBear', 'Confluence'], ['TallBear', 'LandBody'],
      ['Hozho', 'WesternDiagnostic'], ['Hozho', 'SovereignVoid'], ['Hozho', 'AbsentInterlocutor'], ['Hozho', 'MonumentalizingInjury'],
      ['GoedelianWound', 'WesternDiagnostic'], ['GoedelianWound', 'ForensicMateriality'],
      ['Clare', 'IdeologyOfCure'], ['Clare', 'BrilliantImperfection'], ['Simpson', 'LandBody'], ['Simpson', 'LandAsPedagogy'], ['Watts', 'PlaceThought'], ['Watts', 'LandBody'], ['Butler', 'AsymmetricAcc'], ['Butler', 'NormativeViolence'], ['Foucault', 'WesternDiagnostic'], ['Foucault', 'Biopolitics'], ['CripTheory', 'UglyScar'], ['CripTheory', 'CureViolence'], ['Kintsugi', 'AntiKintsugi'], ['ThermodynamicDebt', 'PalimpsestCuts'],

      // Cluster E Connections
      ['Simondon', 'PreIndividual'], ['Simondon', 'Crystallized'], ['Simondon', 'Pickering'], ['Simondon', 'Hacking'], ['Simondon', 'WorkHardening'],
      ['PreIndividual', 'Crystallized'],
      ['Pickering', 'AgentialCut'], ['Pickering', 'MangleMaterial'],
      ['Parikka', 'ForensicMateriality'], ['Parikka', 'Kirschenbaum'], ['Parikka', 'BitRot'], ['Parikka', 'MediaArchaeology'],
      ['Kirschenbaum', 'ForensicMateriality'], ['Kirschenbaum', 'BitRot'], ['Kirschenbaum', 'MediaArchaeology'], ['Kirschenbaum', 'DigitalMateriality'],
      ['Menkman', 'Glitch'], ['Menkman', 'ForensicMateriality'], ['Menkman', 'Betancourt'], ['Menkman', 'VoiceOfApparatus'],
      ['Hacking', 'Simondon'],
      ['Derrida', 'Trace'], ['Derrida', 'Glitch'],
      ['Trace', 'ForensicMateriality'], ['Trace', 'Crystallized'], ['Trace', 'NonSpectacularTrace'],
      ['ForensicMateriality', 'Glitch'], ['ForensicMateriality', 'GoedelianWound'], ['ForensicMateriality', 'ForensicDecay'], ['BitRot', 'ForensicMateriality'],
      ['Cardenas', 'LiveCoding'], ['Cardenas', 'Algorave'], ['Serres', 'Glitch'], ['Burnham', 'FeedbackLoop'], ['Burnham', 'SystemsAesthetics'], ['Ascott', 'SoC'], ['Ascott', 'TelematicArt'], ['LiveCoding', 'Algorave'], ['LiveCoding', 'Strudel'], ['Strudel', 'Algorave'], ['SclerosisThreshold', 'CallusingSclerotic'], ['AlgorithmicSmoothing', 'PhysicalDeformation']
    ];

    rawConnections.forEach(([id1, id2]) => {
      const n1 = this.nodeMap.get(id1);
      const n2 = this.nodeMap.get(id2);
      if (n1 && n2) {
        this.edges.push({ source: n1, target: n2 });
      }
    });

    // BFS Connectivity Pruning - Purge any node that does not have a path to SCAR
    const tempAdj = new Map();
    this.nodes.forEach(n => tempAdj.set(n.id, []));
    this.edges.forEach(e => {
      tempAdj.get(e.source.id)?.push(e.target.id);
      tempAdj.get(e.target.id)?.push(e.source.id);
    });

    const connectedToScar = new Set(['SCAR']);
    const bfsQueue = ['SCAR'];

    while (bfsQueue.length > 0) {
      const curr = bfsQueue.shift();
      const neighbors = tempAdj.get(curr) || [];
      for (const nbr of neighbors) {
        if (!connectedToScar.has(nbr)) {
          connectedToScar.add(nbr);
          bfsQueue.push(nbr);
        }
      }
    }

    // Filter nodes & edges to maintain 100% connected component with SCAR
    this.activeNodeIds = [];
    this.nodes.forEach(n => {
      n.wasEverActive = false;
      n.burnLevel = 0;
      n.activeAnim = 0;
      n.highlightAnim = 0;
    });
  }


  // ponytail: BFS shortest path solver from highlighted node to SCAR
  findShortestPathToScar(startId) {
    if (!startId || startId === 'SCAR') return [];
    if (this.lastPathStartId === startId && this.cachedShortestPath) {
      return this.cachedShortestPath;
    }

    if (!this.adjMap) {
      this.adjMap = new Map();
      this.nodes.forEach(n => this.adjMap.set(n.id, []));
      this.edges.forEach(e => {
        this.adjMap.get(e.source.id)?.push(e.target.id);
        this.adjMap.get(e.target.id)?.push(e.source.id);
      });
    }

    const queue = [[startId]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current === 'SCAR') {
        const nodePath = path.map(id => this.nodeMap.get(id)).filter(Boolean);
        this.lastPathStartId = startId;
        this.cachedShortestPath = nodePath;
        return nodePath;
      }

      const neighbors = this.adjMap.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    return [];
  }

  setSlideState(slideIndex, activeNodeIds = []) {
    this.currentSlideIndex = slideIndex;
    const totalSlides = 23;
    const progress = Math.max(0, Math.min(1, (slideIndex - 1) / (totalSlides - 1)));

    // Continuous SCAR Growth Target Radius
    const scarNode = this.nodeMap.get('SCAR');
    if (scarNode) {
      scarNode.targetRadius = 4 + progress * 10;
    }

    if (slideIndex === 1 || slideIndex === 23) {
      // Slide 1 & 23: ambient graph view without forcing all nodes active
      this.activeNodeIds = [];
      this.isRandomMode = true;
    } else {
      // Active content slides: specific active nodes only
      this.activeNodeIds = activeNodeIds.length > 0 ? activeNodeIds : [];
      this.isRandomMode = false;

      // Accumulate burn-in physical hysteresis memory on active slide nodes
      this.activeNodeIds.forEach(id => {
        const node = this.nodeMap.get(id);
        if (node && node.id !== 'SCAR') {
          node.wasEverActive = true;
          node.burnLevel = Math.min(1.0, node.burnLevel + 0.35);
        }
      });
    }


    this.tickerIndex = 0;
    this.lastTickerTime = performance.now();
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.initGraph();
  }

  update(temperature, act) {
    if (temperature <= 0.001) return; // Sclerosed freeze

    const repulsion = 680;
    const springK = 0.016;
    const damping = 0.88;

    // Repulsion
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy + 0.1;
        const dist = Math.sqrt(distSq);
        if (dist < 320) {
          const force = (repulsion / distSq) * temperature;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          n1.vx -= fx;
          n1.vy -= fy;
          n2.vx += fx;
          n2.vy += fy;
        }
      }
    }

    // Spring attraction
    this.edges.forEach(e => {
      const dx = e.target.x - e.source.x;
      const dy = e.target.y - e.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = (dist - 140) * springK * temperature;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      e.source.vx += fx;
      e.source.vy += fy;
      e.target.vx -= fx;
      e.target.vy -= fy;
    });

    // Continuous SCAR radius lerp
    const scarNode = this.nodeMap.get('SCAR');
    if (scarNode && scarNode.targetRadius) {
      scarNode.radius += (scarNode.targetRadius - scarNode.radius) * 0.05;
    }

    // Slide index to Active Cluster Mapping
    let activeClusters = [];
    const idx = this.currentSlideIndex;
    if (idx >= 1 && idx <= 7) {
      activeClusters = ['A', 'B'];
    } else if (idx >= 8 && idx <= 12) {
      activeClusters = ['C', 'A'];
    } else if (idx >= 13 && idx <= 19) {
      activeClusters = ['D'];
    } else if (idx >= 20) {
      activeClusters = ['E'];
    }

    // Smooth Cluster Aura Cross-Fade Interpolation
    Object.keys(this.clusters).forEach(cKey => {
      const c = this.clusters[cKey];
      const isClusterActive = activeClusters.includes(cKey);
      const targetAura = isClusterActive ? 1.0 : 0.0;
      c.auraAnim = c.auraAnim || 0;
      c.auraAnim += (targetAura - c.auraAnim) * 0.05;
    });

    // Update positions & smooth animation factors
    const time = performance.now() * 0.001;
    const padX = 50;
    const padY = 60;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.nodes.forEach(n => {
      // Organic gentle floating drift
      n.vx += Math.cos(n.phase + time * 0.05) * 0.009 * Math.max(0.1, temperature);
      n.vy += Math.sin(n.phase * 1.3 + time * 0.055) * 0.009 * Math.max(0.1, temperature);

      n.vx *= damping;
      n.vy *= damping;
      n.x += n.vx;
      n.y += n.vy;
      n.phase += 0.005 * temperature;

      // Viewport boundary containment
      if (n.x < padX) { n.x = padX; n.vx = Math.abs(n.vx) * 0.3; }
      if (n.x > w - padX) { n.x = w - padX; n.vx = -Math.abs(n.vx) * 0.3; }
      if (n.y < padY) { n.y = padY; n.vy = Math.abs(n.vy) * 0.3; }
      if (n.y > h - padY) { n.y = h - padY; n.vy = -Math.abs(n.vy) * 0.3; }

      // Smooth Highlight Transition Interpolation (350ms exponential ease in/out)
      const isTarget = (n.id === this.highlightedNodeId);
      const targetAnim = isTarget ? 1.0 : 0.0;
      n.highlightAnim += (targetAnim - n.highlightAnim) * 0.07;

      // Smooth Slide-Active Glow Interpolation
      const isSlideActive = !this.isRandomMode && this.activeNodeIds.includes(n.id);
      const targetActive = isSlideActive ? 1.0 : 0.0;
      n.activeAnim += (targetActive - n.activeAnim) * 0.06;
    });
  }

  render(temperature, act) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    ctx.clearRect(0, 0, width, height);

    const isEthicsBloom = act >= 3;
    const accentColor = themeManager.getColor('accent');
    const nodeFrozenColor = themeManager.getColor('nodeFrozen');
    const edgeFluidColor = themeManager.getColor('nodeEdgeFluid');
    const edgeFrozenColor = themeManager.getColor('nodeEdgeFrozen');

    const totalSlides = 23;
    const progress = Math.max(0, Math.min(1, (this.currentSlideIndex - 1) / (totalSlides - 1)));

    // Determine current highlighted node from ticker
    this.updateTickerHighlight();

    // 0. Render Ambient Cluster Focus Auras & Micro Labels with smooth cross-fading
    Object.keys(this.clusters).forEach(cKey => {
      const c = this.clusters[cKey];
      const isAct3EthicsBloom = (isEthicsBloom && cKey === 'D');
      const auraAnim = c.auraAnim || 0;

      // Calculate dynamic centroid of all live nodes in this cluster
      const clusterNodes = this.nodes.filter(n => n.cluster === cKey);
      let avgX = c.x;
      let avgY = c.y;
      if (clusterNodes.length > 0) {
        let sumX = 0;
        let sumY = 0;
        clusterNodes.forEach(n => { sumX += n.x; sumY += n.y; });
        avgX = sumX / clusterNodes.length;
        avgY = sumY / clusterNodes.length;
      }

      if (auraAnim > 0.01) {
        ctx.save();
        const auraRadius = isAct3EthicsBloom ? 210 : 170;
        const maxAlpha = 0.07;
        const grad = ctx.createRadialGradient(avgX, avgY, 15, avgX, avgY, auraRadius);
        grad.addColorStop(0, `rgba(255, 87, 34, ${(maxAlpha * auraAnim).toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(255, 87, 34, ${(maxAlpha * 0.3 * auraAnim).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(255, 87, 34, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(avgX, avgY, auraRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }


      // Micro Cluster Label Tag
      ctx.save();
      ctx.globalAlpha = 0.18; // Uniform subtle transparency across all cluster headers
      ctx.font = '700 12px "Share Tech Mono", "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = auraAnim > 0.3 ? accentColor : 'rgba(200, 200, 210, 0.9)';
      ctx.fillText(c.label, avgX, avgY - 110);
      ctx.restore();
    });

    // 1. Draw Edges
    this.edges.forEach(e => {
      const isSecondaryEdge = e.source.isSecondary || e.target.isSecondary;
      const isActiveEdge = !this.isRandomMode &&
        this.activeNodeIds.includes(e.source.id) && this.activeNodeIds.includes(e.target.id);
      const isScarActiveEdge = !this.isRandomMode &&
        ((e.source.id === 'SCAR' && this.activeNodeIds.includes(e.target.id)) ||
         (e.target.id === 'SCAR' && this.activeNodeIds.includes(e.source.id)));

      ctx.beginPath();
      ctx.moveTo(e.source.x, e.source.y);
      ctx.lineTo(e.target.x, e.target.y);

      if (isActiveEdge || isScarActiveEdge) {
        ctx.strokeStyle = 'rgba(255, 140, 60, 0.55)';
        ctx.lineWidth = 1.1;
      } else if (isSecondaryEdge) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = 0.4;
      } else {
        ctx.strokeStyle = temperature > 0.1 ? edgeFluidColor : edgeFrozenColor;
        ctx.lineWidth = 0.6;
      }
      ctx.stroke();
    });

    // 1.5 Draw Smooth Fading White Animated Dotted Shortest Path to SCAR + Data Packet Pulse
    const activeHighlightedNode = this.highlightedNodeId ? this.nodeMap.get(this.highlightedNodeId) : null;
    const activePathAnim = activeHighlightedNode ? activeHighlightedNode.highlightAnim : 0.0;

    if (activeHighlightedNode && this.highlightedNodeId !== 'SCAR' && activePathAnim > 0.01) {
      const pathNodes = this.findShortestPathToScar(this.highlightedNodeId);
      if (pathNodes.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pathNodes[0].x, pathNodes[0].y);
        for (let i = 1; i < pathNodes.length; i++) {
          ctx.lineTo(pathNodes[i].x, pathNodes[i].y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.22 * activePathAnim).toFixed(3)})`;
        ctx.lineWidth = 1.0;
        ctx.setLineDash([3, 4]);
        ctx.lineDashOffset = -(performance.now() / 110) % 7;
        ctx.shadowColor = `rgba(255, 255, 255, ${(0.08 * activePathAnim).toFixed(3)})`;
        ctx.shadowBlur = 2;
        ctx.stroke();
        ctx.restore();

        // Data Packet Signal Pulse traveling along shortest path to SCAR
        const packetProgress = ((performance.now() - this.lastTickerTime) / this.highlightDuration) % 1;
        const totalSegs = pathNodes.length - 1;
        const segIndex = Math.min(totalSegs - 1, Math.floor(packetProgress * totalSegs));
        const segT = (packetProgress * totalSegs) - segIndex;
        const p1 = pathNodes[segIndex];
        const p2 = pathNodes[segIndex + 1];

        if (p1 && p2) {
          const px = p1.x + (p2.x - p1.x) * segT;
          const py = p1.y + (p2.y - p1.y) * segT;
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(0.45 * activePathAnim).toFixed(3)})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // 2. Draw Nodes (Shapes: Circles for People, Diamonds for Terms, SCAR Anchor)
    this.nodes.forEach(n => {
      const isScar = n.id === 'SCAR';
      const anim = n.highlightAnim;
      const actAnim = n.activeAnim || 0;

      const extraHighlightRadius = 1.2 * anim + 0.6 * actAnim;
      const pulseRadius = Math.max(1.8, n.radius + Math.sin(n.phase) * (temperature * 1.5) + extraHighlightRadius);

      // Node Geometry Path: Circle for People, Diamond for Terms
      ctx.beginPath();
      if (isScar || n.isPerson) {
        // People & SCAR = Circle
        ctx.arc(n.x, n.y, pulseRadius, 0, Math.PI * 2);
      } else {
        // Terms = Diamond (Rhombus)
        const d = pulseRadius * 1.25;
        ctx.moveTo(n.x, n.y - d);
        ctx.lineTo(n.x + d, n.y);
        ctx.lineTo(n.x, n.y + d);
        ctx.lineTo(n.x - d, n.y);
        ctx.closePath();
      }

      // Smooth Fill Color Interpolation (Fade from base fill to Hot Orange Accent)
      if (isScar) {
        ctx.fillStyle = accentColor;
        ctx.shadowColor = themeManager.getColor('accentGlow');
        ctx.shadowBlur = 8 + progress * 12;
      } else if (anim > 0.01) {
        // Dynamic smooth color lerp from base to hot orange accent
        const baseR = actAnim > 0.1 ? 240 : (n.isSecondary ? 100 : 120);
        const baseG = actAnim > 0.1 ? 240 : (n.isSecondary ? 100 : 120);
        const baseB = actAnim > 0.1 ? 250 : (n.isSecondary ? 110 : 130);
        const baseA = actAnim > 0.1 ? 0.95 : (n.isSecondary ? 0.16 : 0.28);
        const r = Math.round(baseR + (255 - baseR) * anim);
        const g = Math.round(baseG + (87 - baseG) * anim);
        const b = Math.round(baseB + (34 - baseB) * anim);
        const a = (baseA + (1.0 - baseA) * anim).toFixed(3);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.shadowColor = themeManager.getColor('accentGlow');
        ctx.shadowBlur = Math.round(12 * anim + 6 * actAnim * (1 - anim));
      } else if (actAnim > 0.01) {
        // Slide-related active nodes: Bright crisp white with smooth glow lerp
        const a = (0.28 + 0.67 * actAnim).toFixed(3);
        ctx.fillStyle = `rgba(240, 240, 250, ${a})`;
        ctx.shadowColor = themeManager.getColor('accentGlow');
        ctx.shadowBlur = Math.round(6 * actAnim);
      } else if (n.wasEverActive && n.burnLevel > 0) {
        // Ponytail: Burned-in nodes retain warm amber scar trace & subtle glow when inactive
        const bAlpha = (0.20 + 0.45 * n.burnLevel).toFixed(3);
        ctx.fillStyle = `rgba(226, 135, 67, ${bAlpha})`; // Warm amber/copper scar burn color
        ctx.shadowColor = 'rgba(226, 135, 67, 0.6)';
        ctx.shadowBlur = Math.round(4 + 6 * n.burnLevel);
      } else if (n.isSecondary) {
        ctx.fillStyle = temperature > 0.1 ? 'rgba(100, 100, 110, 0.16)' : 'rgba(60, 60, 70, 0.09)';
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = temperature > 0.1 ? 'rgba(120, 120, 130, 0.28)' : nodeFrozenColor;
        ctx.shadowBlur = 0;
      }

      ctx.fill();

      // Outer concentric outline ring for People (Thinkers)
      if (n.isPerson && !isScar) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius + 2.8, 0, Math.PI * 2);
        if (anim > 0.01) {
          ctx.strokeStyle = `rgba(255, ${Math.round(255 - 168 * anim)}, ${Math.round(255 - 221 * anim)}, ${(0.70 + 0.30 * anim).toFixed(3)})`;
          ctx.lineWidth = 0.8 + 0.4 * anim;
        } else if (actAnim > 0.01) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(0.30 + 0.40 * actAnim).toFixed(3)})`;
          ctx.lineWidth = 0.8 + 0.2 * actAnim;
        } else if (n.isSecondary) {
          ctx.strokeStyle = 'rgba(160, 160, 170, 0.18)';
          ctx.lineWidth = 0.8;
        } else {
          ctx.strokeStyle = 'rgba(180, 180, 190, 0.30)';
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();
      }

      // Precision Reticle Brackets (┌ ┐ └ ┘) around active nodes and ticker node
      const showReticle = anim > 0.08 || (actAnim > 0.1 && n.id !== 'SCAR');
      if (showReticle) {
        ctx.save();
        const rAlpha = anim > 0.08 ? (0.30 * anim) : (0.18 * actAnim);
        ctx.globalAlpha = rAlpha;
        ctx.strokeStyle = anim > 0.08 ? accentColor : 'rgba(240, 240, 250, 0.8)';
        ctx.lineWidth = 0.8;
        const bSize = pulseRadius + 5;
        const bLen = 3;
        // Top-left
        ctx.beginPath(); ctx.moveTo(n.x - bSize, n.y - bSize + bLen); ctx.lineTo(n.x - bSize, n.y - bSize); ctx.lineTo(n.x - bSize + bLen, n.y - bSize); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(n.x + bSize - bLen, n.y - bSize); ctx.lineTo(n.x + bSize, n.y - bSize); ctx.lineTo(n.x + bSize, n.y - bSize + bLen); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(n.x - bSize, n.y + bSize - bLen); ctx.lineTo(n.x - bSize, n.y + bSize); ctx.lineTo(n.x - bSize + bLen, n.y + bSize); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(n.x + bSize - bLen, n.y + bSize); ctx.lineTo(n.x + bSize, n.y + bSize); ctx.lineTo(n.x + bSize, n.y + bSize - bLen); ctx.stroke();
        ctx.restore();
      }
    });
    ctx.shadowBlur = 0;

    // 3. Render node title labels for active slide nodes & burned-in historical nodes
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    this.nodes.forEach(n => {
      if (n.id !== this.highlightedNodeId && n.id !== 'SCAR') {
        const isSlideActive = !this.isRandomMode && this.activeNodeIds.includes(n.id);
        if (isSlideActive && n.activeAnim > 0.05) {
          ctx.font = '600 12px "Share Tech Mono", "JetBrains Mono", monospace';
          const lAlpha = (0.40 + 0.55 * n.activeAnim).toFixed(3);
          ctx.strokeStyle = '#08080f';
          ctx.lineWidth = 3;
          ctx.strokeText(n.label, n.x, n.y - n.radius - 6);

          ctx.fillStyle = `rgba(240, 240, 250, ${lAlpha})`;
          ctx.shadowColor = themeManager.getColor('accentGlow');
          ctx.shadowBlur = 8;
          ctx.fillText(n.label, n.x, n.y - n.radius - 6);
        } else if (n.wasEverActive && n.burnLevel > 0) {
          ctx.font = '500 10px "Share Tech Mono", "JetBrains Mono", monospace';
          const lAlpha = (0.12 + 0.28 * n.burnLevel).toFixed(3);
          ctx.fillStyle = `rgba(226, 135, 67, ${lAlpha})`;
          ctx.fillText(n.label, n.x, n.y - n.radius - 4);
        }
      }
    });
    ctx.restore();


    // 4. Sequential Node Title Text Animation Ticker + Micro Telemetry Readout
    this.renderNodeLabelTicker(ctx, temperature);
  }

  updateTickerHighlight() {
    if (!this.activeNodeIds || this.activeNodeIds.length === 0) {
      this.highlightedNodeId = null;
      return;
    }

    const now = performance.now();
    const elapsed = now - this.lastTickerTime;

    if (elapsed > this.highlightDuration) {
      this.lastTickerTime = now;
      if (this.isRandomMode) {
        this.tickerIndex = Math.floor(Math.random() * this.activeNodeIds.length);
      } else {
        this.tickerIndex = (this.tickerIndex + 1) % this.activeNodeIds.length;
      }
    }

    this.highlightedNodeId = this.activeNodeIds[this.tickerIndex % this.activeNodeIds.length];
  }

  renderNodeLabelTicker(ctx, temperature) {
    if (!this.highlightedNodeId) return;

    const targetNode = this.nodeMap.get(this.highlightedNodeId);
    if (!targetNode) return;

    const now = performance.now();
    const timeInCycle = (now - this.lastTickerTime) % this.highlightDuration;
    let alpha = 1.0;
    if (timeInCycle < 800) {
      alpha = timeInCycle / 800;
    } else if (timeInCycle > this.highlightDuration - 500) {
      alpha = (this.highlightDuration - timeInCycle) / 500;
    }
    alpha = Math.max(0, Math.min(1, alpha));

    const displayLabel = targetNode.label;
    const pathNodes = this.findShortestPathToScar(targetNode.id);
    const hops = pathNodes.length > 0 ? pathNodes.length - 1 : 0;
    const degree = this.edges.filter(e => e.source.id === targetNode.id || e.target.id === targetNode.id).length;
    const padDegree = degree < 10 ? `0${degree}` : `${degree}`;
    const telemetry = `[MASS::${padDegree}]`;


    ctx.save();
    ctx.globalAlpha = alpha;

    // 1. Title ABOVE the dot
    ctx.font = '700 16px "Share Tech Mono", "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    const textX = targetNode.x;
    const titleY = targetNode.y - targetNode.radius - 12;

    // Dark backdrop stroke for maximum legibility
    ctx.strokeStyle = '#08080f';
    ctx.lineWidth = 4;
    ctx.strokeText(displayLabel, textX, titleY);

    // Hot orange accent filled text with bloom
    ctx.fillStyle = themeManager.getColor('accent');
    ctx.shadowColor = themeManager.getColor('accentGlow');
    ctx.shadowBlur = 12;
    ctx.fillText(displayLabel, textX, titleY);

    // 2. Micro Diagnostic Telemetry UNDER the dot
    ctx.shadowBlur = 0;
    ctx.textBaseline = 'top';
    ctx.font = '400 9px "Share Tech Mono", "JetBrains Mono", monospace';
    const telemetryY = targetNode.y + targetNode.radius + 14;

    ctx.strokeStyle = '#08080f';
    ctx.lineWidth = 3;
    ctx.strokeText(telemetry, textX, telemetryY);

    ctx.fillStyle = 'rgba(160, 160, 170, 0.45)';
    ctx.fillText(telemetry, textX, telemetryY);

    ctx.restore();
  }
}
