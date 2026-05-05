angular.module("todoApp", [])
.controller("todoCtrl", function($scope){
    $scope.tasks = [];
    $scope.newTask = "";

    $scope.addTask = function(){
        if($scope.newTask === "") return;
        $scope.tasks.push($scope.newTask);
        $scope.newTask = "";
    };

    $scope.deleteTask = function(index){
        $scope.tasks.splice(index, 1);
    };

    $scope.editTask = function(index){
        let updated = prompt("Edit task:", $scope.tasks[index]);
        if(updated){
            $scope.tasks[index] = updated;
        }
    };

});