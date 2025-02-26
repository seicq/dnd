from django.db import models

# Create your models here.
from django.db import models

class Level(models.Model):
    level_id = models.IntegerField(unique=True)
    num_blocks = models.IntegerField()
    correct_sequence = models.CharField(max_length=255)  # Example: "5-3-2-4-1"
    description = models.TextField(default="Drag and drop the blocks into the correct order.")  # New field

    def __str__(self):
        return f"Level {self.level_id}"

class Block(models.Model):
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name="blocks")
    block_id = models.IntegerField()
    content = models.TextField()

    def __str__(self):
        return f"Block {self.block_id} (Level {self.level.level_id})"
