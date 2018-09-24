import Phaser from "phaser";

const preload = function prelaod() {
  this.load.spritesheet("player", "assets/player-sprite.png", {
    frameWidth: 53,
    frameHeight: 54
  });
  this.load.image("obstacle", "assets/obstacle.png");
};

let platforms: Phaser.Physics.Arcade.StaticGroup;
let player: Phaser.Physics.Arcade.Body;
let cursors: Phaser.Input;

const create = function create() {
  cursors = this.input.keyboard.createCursorKeys();
  platforms = this.physics.add.staticGroup();
  platforms
    .create(200, 200, "obstacle")
    .setScale(2)
    .refreshBody();

  player = this.physics.add.sprite(100, 100, "player");
  player.setBounce(0.5, 0.5);
  player.setCollideWorldBounds(true);

  // create anims for the character
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
    frameRate: 5,
    repeat: -1
  });

  // Make player and platforms collidable
  this.physics.add.collider(player, platforms);
};

const update = function update() {
  const velocity = { x: 0, y: 0 };

  if (cursors.left.isDown) {
    player.setScale(-1, 1);
    velocity.x = -60;

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setScale(1, 1);
    velocity.x = 60;

    player.anims.play("right", true);
  } else {
    velocity.x = 0;
  }
  if (cursors.up.isDown) {
    velocity.y = -60;
  } else if (cursors.down.isDown) {
    velocity.y = 60;
  } else {
    velocity.y = 0;
  }

  player.setVelocity(velocity.x, velocity.y);
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0.001 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game: Phaser.Game = new Phaser.Game(config);
