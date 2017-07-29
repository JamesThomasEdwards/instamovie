 
 var url = 'https://api.themoviedb.org/3/movie/315635/images?api_key=d8d94bcf898938939d96dd422b52b026'
 var imageUrl = 'http://image.tmdb.org/t/p/w500/'
 var imageId = ''
 $(function(){
 function movie(){
 $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function(data){
      console.log(data);
      for (var i = 0; i < data.length; i++){
          return data[i].posters.file_path;
      }
    }
  })
 }
 movie()
 })