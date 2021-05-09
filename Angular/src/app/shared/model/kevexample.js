const input = document.querySelector('.imageFile');
input.addEventListener('change', function(e){
    const reader = new FileReader();
    reader.onload = function(){

        const img = new Image();
        img.src = reader.result;
        const design = document.querySelector('.design');
        var child = design.lastElementChild;  
        while (child) { 
            design.removeChild(child); 
            child = design.lastElementChild; 
        } 
        design.appendChild(img);

    }
    reader.readAsDataURL(input.files[0]);
},false)
