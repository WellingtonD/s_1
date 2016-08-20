angular.module('estoque').controller('OptCtrl', function($scope) {          
    $scope.options = {
        height: 150,
        toolbar: [
            //['edit',['undo','redo']],
            //['headline', ['style']],
            //['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['style', ['bold', 'italic', 'underline']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            //['table', ['table']],
            //['insert', ['link','picture','video','hr']],
            //['view', ['fullscreen', 'codeview']],
            //['help', ['help']],
            ['misc', ['print']]
        ]
    };        
});