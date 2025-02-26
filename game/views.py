from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt  # Import csrf_exempt
from .models import Level  # Remove duplicate import

@csrf_exempt  # Use this to bypass CSRF for testing. Remove in production.
def validate_sequence(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            level = Level.objects.get(level_id=data['level_id'])

            # Check if the sequence matches
            if data['sequence'] == level.correct_sequence:
                return JsonResponse({"message": "Correct! Level completed."})
            else:
                return JsonResponse({"message": "Incorrect. Try again."})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

def level_view(request, level_id):
    level = get_object_or_404(Level, level_id=level_id)
    blocks = level.blocks.all()
    return render(request, "game/level.html", {"level": level, "blocks": blocks})
