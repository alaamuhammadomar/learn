
var CourseName=document.getElementById('CourseName')
var CourseCategory=document.getElementById('CourseCategory')
var CoursePrice=document.getElementById('CoursePrice')
var CourseDescription=document.getElementById('CourseDescription')
var CourseCapacity=document.getElementById('CourseCapacity')
var addbtn=document.getElementById('click')
var data=document.getElementById('data')
var deleteBtn=document.getElementById('deleteBtn')
var search=document.getElementById('search')
var currentIndex=0
//creat course
var courses
if(JSON.parse(localStorage.getItem('courses'))==null){
    courses=[]
}else{
    courses=JSON.parse(localStorage.getItem('courses'))
    displayData()}
addbtn.onclick=function(event){
    event.preventDefault();
    if(addbtn.value=='add course'){
        addCourse()   
    }else
    updateCourse()
    

}
function addCourse(){
    var course={
        CourseName:CourseName.value,
        CourseCategory:CourseCategory.value,
        CoursePrice:CoursePrice.value,
        CourseDescription:CourseDescription.value,
        CourseCapacity:CourseCapacity.value,
}
courses.push(course)
localStorage.setItem('courses', JSON.stringify(courses))
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  
clearInputs()
displayData()

}
//clear inputs 
function clearInputs(){
    CourseName.value='' 
    CourseCategory.value=''  
    CoursePrice.value=''  
    CourseDescription.value=''  
    CourseCapacity.value=''   
}

//read display data in the table
function displayData(){
    
    var result='';
   
    for(var i=0; i<courses.length;i++){
    result+=`
    <tr>
        <td>${i+1}</td>
        <td>${courses[i].CourseName}</td>
        <td>${courses[i].CourseCategory}</td>
        <td>${courses[i].CoursePrice}</td>
        <td>${courses[i].CourseDescription}</td>
        <td>${courses[i].CourseCapacity}</td>
        <td><button class="btn btn-success" onclick="getCourse(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deletecourse(${i})">delete</button></td>
        </tr
        `
    }
   data.innerHTML=result;
   
}
//delete course
function deletecourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1)
            localStorage.setItem('courses', JSON.stringify(courses))
    displayData() //without this it will not work, it needs an order to display data again
          Swal.fire(
            'Deleted!',
            'All files have been deleted.',
            'success'
          )
        }
      })
    
}
//delete all
deleteBtn.onclick=function deleteall(){
    courses=[];
    data.innerHTML='';
    localStorage.setItem('courses', JSON.stringify(courses))
}
//search
search.onkeyup=function(){
    var result='';
   
    for(var i=0; i<courses.length;i++){
        if(courses[i].CourseName.toLowerCase().includes(search.value.toLowerCase())){
    result+=`
    <tr>
        <td>${i+1}</td>
        <td>${courses[i].CourseName}</td>
        <td>${courses[i].CourseCategory}</td>
        <td>${courses[i].CoursePrice}</td>
        <td>${courses[i].CourseDescription}</td>
        <td>${courses[i].CourseCapacity}</td>
        <td><button class="btn btn-success"  >update</button></td>
        <td><button class="btn btn-danger" onclick="deletecourse(${i})">delete</button></td>
        </tr
        `
    }}
    
   data.innerHTML=result;

}
//update
function getCourse(index){
    var course=courses[index]
    CourseName.value=course.CourseName
CourseCategory.value=course.CourseCategory 
CoursePrice.value=course.CoursePrice
CourseDescription.value=course.CourseDescription 
CourseCapacity.value=course.CourseCapacity 
addbtn.value='update Course'
currentIndex=index

   
}
function updateCourse(){
    var course={
        CourseName:CourseName.value,
        CourseCategory:CourseCategory.value,
        CoursePrice:CoursePrice.value,
        CourseDescription:CourseDescription.value,
        CourseCapacity:CourseCapacity.value,
}
courses[currentIndex].CourseName=course.CourseName
courses[currentIndex].CourseCategory=course.CourseCategory
courses[currentIndex].CoursePrice=course.CoursePrice
courses[currentIndex].CourseDescription=course.CourseDescription
courses[currentIndex].CourseCapacity=course.CourseCapacity
localStorage.setItem('courses', JSON.stringify(courses))
displayData()
addbtn.value='Add Course'
clearInputs()

}

//validation

