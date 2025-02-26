from django.contrib import admin
from .models import Level, Block

class BlockInline(admin.TabularInline):
    model = Block
    extra = 1  # Allows adding blocks directly in the Level form

class LevelAdmin(admin.ModelAdmin):
    list_display = ('level_id', 'num_blocks', 'description')  # Show description in the admin list
    search_fields = ('level_id', 'description')
    inlines = [BlockInline]  # This will show Block options inside LevelAdmin

admin.site.register(Level, LevelAdmin)
