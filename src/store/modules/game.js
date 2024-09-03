import { getRoleActions } from "@/data/predefinedRoles";

const state = {
  currentPhase: null,
  players: [],
  roleActions: {},
  actionHistory: [],
  phaseDurations: {
    Night: 120,
    "Day Discussion": 180,
    "Day Voting": 60,
    Execution: 30,
  },
};

const mutations = {
  SET_CURRENT_PHASE(state, phase) {
    state.currentPhase = phase;
  },
  SET_PLAYERS(state, players) {
    state.players = players;
  },
  SET_ROLE_ACTIONS(state, roleActions) {
    state.roleActions = roleActions;
  },
  ADD_ACTION_HISTORY(state, action) {
    state.actionHistory.push(action);
  },
  SET_PHASE_DURATIONS(state, phaseDurations) {
    state.phaseDurations = phaseDurations;
  },
};

const actions = {
  initializeGame({ commit }, players) {
    commit("SET_PLAYERS", players);
    commit("SET_ROLE_ACTIONS", getRoleActions());
    commit("SET_CURRENT_PHASE", "night");
  },
  performAction({ commit, state }, { roleId, playerId, action }) {
    const roleAction = state.roleActions[roleId];
    if (roleAction) {
      commit("ADD_ACTION_HISTORY", {
        roleId,
        playerId,
        action,
        phase: state.currentPhase,
        timestamp: Date.now(),
      });
    }
  },
  nextPhase({ commit, state }) {
    const phases = ["night", "day", "vote"];
    const currentIndex = phases.indexOf(state.currentPhase);
    const nextPhase = phases[(currentIndex + 1) % phases.length];
    commit("SET_CURRENT_PHASE", nextPhase);
  },
};

const getters = {
  getCurrentPhase: (state) => state.currentPhase,
  getPlayers: (state) => state.players,
  getRoleActions: (state) => state.roleActions,
  getActionHistory: (state) => state.actionHistory,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
