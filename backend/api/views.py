from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Movie
from .serializers import MovieSerializer

class MovieList(APIView):
    
    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
        
    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class MovieDetail(APIView):
    
    def get_object(self, pk):
        try:
            return Movie.objects.get(pk=pk)
        except Movie.DoesNotExist:
            return None
            
    def get(self, request, pk):
        movie = self.get_object(pk)
        if not movie:
            return Response({"error": "Not found"}, status=404)
            
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
        
    def put(self, request, pk):
        movie = self.get_object(pk)
        if not movie:
            return Response({"error": "Not found"}, status=404)
        
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
            
        return Response(serializer.errors)
        
    def delete(self, request, pk):
        movie = self.get_object(pk)
        if not movie:
            return Response({"error": "Not found"}, status=404)
            
        movie.delete()
        return Response({"message": "Deleted"})