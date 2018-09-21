extends Area2D

#signal hit

export (int) var SPEED
var velocity = Vector2()
var screensize
var isColliding = false

func _ready():
	hide()
	screensize = get_viewport_rect().size
	
func start(pos):
	position = pos
	show()
	$CollisionShape2D.disabled = false

			
func _process(delta):
	velocity = Vector2()
	if Input.is_action_pressed("ui_right"):
		velocity.x += 1
	if Input.is_action_pressed("ui_left"):
		velocity.x -= 1
	if Input.is_action_pressed("ui_down"):
		velocity.y += 1
	if Input.is_action_pressed("ui_up"):
		velocity.y -= 1
	if velocity.length() > 0:
		velocity = velocity.normalized() * SPEED
		$AnimatedSprite.play()
	else:
		$AnimatedSprite.stop()
		
#	position += velocity * delta
#	position.x = clamp(position.x, 0, screensize.x)
#	position.y = clamp(position.y, 0, screensize.y)
	if isColliding != true:
		move_local_y(velocity.y * delta)
		move_local_x(velocity.x * delta)

	if velocity.x != 0:
		$AnimatedSprite.animation = "right"
		$AnimatedSprite.flip_v = false
		$AnimatedSprite.flip_h = velocity.x < 0
#
func _on_Player_body_entered( body ):
	isColliding = true
#	$CollisionShape2D.disabled = false
	hide()
#	emit_signal("hit")
