from django.shortcuts import render

from rest_framework.decorators import api_view
from django.http.response import JsonResponse
import time


# Create your views here.

@api_view(['GET', 'POST'])
def query(request):
    if request.method == 'GET':
        time.sleep(1)
        return JsonResponse({"name": "子归歌"}, safe=False)
    elif request.method == 'POST':
        return JsonResponse({"name": "麦子随想"}, safe=False)
