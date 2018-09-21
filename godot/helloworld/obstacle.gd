extends RigidBody2D

# class member variables go here, for example:
# var a = 2
# var b = "textvar"

func start(pos):
	position = pos
	show()

#func _process(delta):
#	# Called every frame. Delta is time since last frame.
#	# Update game logic here.
#	pass


func _on_Player_hit():
	pass # replace with function body


func _on_Player_body_entered(body):
	pass # replace with function body
