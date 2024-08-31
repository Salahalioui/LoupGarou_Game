export const predefinedRoles = [
  {
    id: "werewolf",
    name: "Werewolf",
    description: "A villager-eating werewolf",
    image: require("@/assets/images/roles/werewolf.jpeg"),
  },
  {
    id: "villager",
    name: "Villager",
    description: "A regular villager",
    image: require("@/assets/images/roles/villager.jpeg"),
  },
  {
    id: "seer",
    name: "Seer",
    description: "Can see the true identity of one player each night",
    image: require("@/assets/images/roles/Seer.jpeg"),
  },
  {
    id: "town_guard",
    name: "Town Guard",
    description: "Can protect one player each night from being eliminated",
    image: require("@/assets/images/roles/Knight.jpeg"),
  },
  {
    id: "hunter",
    name: "Hunter",
    description: "Can eliminate one player when they are eliminated",
    image: require("@/assets/images/roles/Hunter.jpeg"),
  },
  {
    id: "witch",
    name: "Witch",
    description:
      "Has a poison and a potion that can be used to save a player or eliminate a player",
    image: require("@/assets/images/roles/Witch.jpeg"),
  },
  {
    id: "The Priest",
    name: "The Priest",
    description:
      "he can spray a player with holy water if that Player is a werewolf , he will be eliminated",
    image: require("@/assets/images/roles/Priest.jpeg"),
  },

  {
    id: "The Detective",
    name: "The Detective",
    description:
      "Can investigate two players each night to see if they are in the same team",
    image: require("@/assets/images/roles/Detective.jpeg"),
  },
  {
    id: "The Theif",
    name: "The Theif",
    description:
      "Can switch his identity with another player once during the game, if the other player is a werewolf, he will become a werewolf and if the other player is a villager with a role that has not been revealed, he will become that role",
    image: require("@/assets/images/roles/Theif.jpeg"),
  },
  {
    id: "The Judge",
    name: "The Judge",
    description:
      "Can invoke the voting of the players once during the game, the player who is voted out will not be eliminated",
    image: require("@/assets/images/roles/Judge.jpeg"),
  },
  {
    id: "The Crow",
    name: "The Crow",
    description:
      "he chose a player , during the voting that player will hold two votes",
    image: require("@/assets/images/roles/Crow.jpeg"),
  },
  {
    id: "The Elder",
    name: "The Elder",
    description:
      "if he eliminated by the villagers, the villagers actions will be cancelled",
    image: require("@/assets/images/roles/Elder.jpeg"),
  },
  {
    id: "The Patient",
    name: "The Patient",
    description:
      "if he is eliminated by the werewolves, the werewolves will lose their night actions , and if the villagers voted him out , the werewolves will kill twice",
    image: require("@/assets/images/roles/Patient.jpeg"),
  },
  {
    id: "scapegoat",
    name: "Scapegoat",
    description: "he can chose to be eliminated instead of another player",
    image: require("@/assets/images/roles/Goat.jpeg"),
  },
  {
    id: "The Big Bad Wolf",
    name: "The Big Bad Wolf",
    description:
      "he is the werewolf leader, he can choose to eliminate one player each night, and can chose the change a werewolf with a villager (the werewolve will be eliminated",
    image: require("@/assets/images/roles/BlackWolf.jpeg"),
  },
  {
    id: "The Wolf Cub",
    name: "The Wolf Cub",
    description:
      "when eliminated by the villagers, the werewolves will kill one more player",
    image: require("@/assets/images/roles/Cupwolf.jpeg"),
  },
  {
    id: "The Seer Werewolf",
    name: "The Seer Werewolf",
    description: "he can reveal the true identity of once per Game",
    image: require("@/assets/images/roles/wolve_seer.jpeg"),
  },
  {
    id: "The White Werewolf",
    name: "The White Werewolf",
    description:
      "lone wolf , he can kill a werewolf each two nights , he only wins if he is the only werewolf surviving",
    image: require("@/assets/images/roles/WhiteWolf.jpeg"),
  },
  {
    id: "The Drunk",
    name: "The Drunk",
    description:
      "Loner Role , when he is eliminated by the villagers, him only will win the  game",
    image: require("@/assets/images/roles/Drunk.jpeg"),
  },
  {
    id: "Coupid",
    name: "Coupid",
    description:
      "in the first night he can chose two players to fell in love , if one of those player elimineted the other player will be eliminated too , the coupid will only win when the two players are the only ones surviving",
    image: require("@/assets/images/roles/Coupid.jpeg"),
  },
];
