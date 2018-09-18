class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;
  
  solid;
  
  awake() {
    this.solid = Sup.getActor('Solid').arcadeBody2D;
  }

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solid);

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    // if(this.actor.arcadeBody2D.getTouches()) {
    //   velocity.x = 0;
    // }

    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;

    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);

Sup.loadScene("Main Scene");