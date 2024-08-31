import { createStore } from "vuex";
import IndexedDBService from "@/services/IndexedDBService";

const dbService = new IndexedDBService();

export default createStore({
  state: {
    roles: [],
    players: [],
    games: [],
  },
  mutations: {
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_PLAYERS(state, players) {
      state.players = players;
    },
    SET_GAMES(state, games) {
      state.games = games;
    },
    ADD_ROLE(state, role) {
      state.roles.push(role);
    },
    ADD_PLAYER(state, player) {
      state.players.push(player);
    },
    ADD_GAME(state, game) {
      state.games.push(game);
    },
    UPDATE_ROLE(state, updatedRole) {
      const index = state.roles.findIndex((role) => role.id === updatedRole.id);
      if (index !== -1) {
        state.roles.splice(index, 1, updatedRole);
      }
    },
    UPDATE_PLAYER(state, updatedPlayer) {
      const index = state.players.findIndex(
        (player) => player.id === updatedPlayer.id
      );
      if (index !== -1) {
        state.players.splice(index, 1, updatedPlayer);
      }
    },
    DELETE_ROLE(state, roleId) {
      state.roles = state.roles.filter((role) => role.id !== roleId);
    },
    DELETE_PLAYER(state, playerId) {
      state.players = state.players.filter((player) => player.id !== playerId);
    },
  },
  actions: {
    async initDB({ dispatch }) {
      await dbService.initDB();
      await dispatch("loadAllData");
    },
    async loadAllData({ dispatch }) {
      await Promise.all([
        dispatch("loadRoles"),
        dispatch("loadPlayers"),
        dispatch("loadGames"),
      ]);
    },
    async loadRoles({ commit }) {
      const roles = await dbService.getAll("roles");
      commit("SET_ROLES", roles);
    },
    async loadPlayers({ commit }) {
      const players = await dbService.getAll("players");
      commit("SET_PLAYERS", players);
    },
    async loadGames({ commit }) {
      const games = await dbService.getAll("games");
      commit("SET_GAMES", games);
    },
    async addRole({ commit }, role) {
      const id = await dbService.add("roles", role);
      commit("ADD_ROLE", { ...role, id });
    },
    async addPlayer({ commit }, player) {
      const id = await dbService.add("players", player);
      commit("ADD_PLAYER", { ...player, id });
    },
    async addGame({ commit }, game) {
      const id = await dbService.add("games", game);
      commit("ADD_GAME", { ...game, id });
    },
    async updateRole({ commit }, role) {
      await dbService.update("roles", role);
      commit("UPDATE_ROLE", role);
    },
    async updatePlayer({ commit }, player) {
      await dbService.update("players", player);
      commit("UPDATE_PLAYER", player);
    },
    async deleteRole({ commit }, roleId) {
      await dbService.delete("roles", roleId);
      commit("DELETE_ROLE", roleId);
    },
    async deletePlayer({ commit }, playerId) {
      await dbService.delete("players", playerId);
      commit("DELETE_PLAYER", playerId);
    },
  },
  modules: {},
});
